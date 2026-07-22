import ExcelJS from 'exceljs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { saveAsMock } = vi.hoisted(() => ({ saveAsMock: vi.fn() }))

vi.mock('file-saver', () => ({ saveAs: saveAsMock }))

import { exportToExcel } from '../excelExport'

const exportData = {
  mode: 'quotation' as const,
  quotNo: 'KMTE-53',
  clientInfo: {
    company: 'Kusakabe Electric and Machinery Co., Ltd.',
    contact: 'Mr. Seiichi Fujigami',
    address: 'Kobe, Japan',
    phone: '078-392-9145',
  },
  quotationDetails: {
    quotationNo: 'KMTE-53',
    referenceNo: 'REF-53',
    date: '2026-07-22',
  },
  billingDetails: {},
  tasks: [
    {
      id: 1,
      parentId: null,
      level: 0,
      isMainTask: true,
      referenceNumber: 'CONST-01',
      machineCode: 'MC-01',
      description: 'Assembly',
      type: '3D',
    },
    {
      id: 2,
      parentId: 1,
      level: 1,
      isMainTask: false,
      unitCode: 'UNIT-01',
      description: 'Drawing unit',
      type: '3D',
      time: 480,
    },
  ],
  baseRates: {
    overheadPercentage: 0,
    timeChargeRate3D: 0,
    overtimeRate: 0,
    otHoursMultiplier: 1.3,
    softwareRate: 0,
  },
  manualOverrides: { tasks: {}, footer: {} },
  signatures: {
    quotation: {
      preparedBy: { name: 'Prepared User', title: 'Engineer' },
      approvedBy: { name: 'Approved User', title: 'Manager' },
      receivedBy: { label: '(Signature Over Printed Name)' },
    },
    billing: {
      preparedBy: { name: '', title: '' },
      approvedBy: { name: '', title: '' },
      finalApprover: { name: '', title: '' },
    },
  },
  layoutVariant: 'kemco' as const,
}

describe('Excel quotation export fallback', () => {
  beforeEach(() => {
    saveAsMock.mockReset()
  })

  it('creates a complete styled KEMCO workbook locally', async () => {
    await exportToExcel(exportData as any)

    expect(saveAsMock).toHaveBeenCalledOnce()
    const [blob, filename] = saveAsMock.mock.calls[0]
    expect(filename).toBe('Quotation_KMTE-53_2026-07-22.xlsx')

    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(await blob.arrayBuffer())
    const sheet = workbook.getWorksheet('Quotation')!

    expect(sheet.getCell('C1').value).toBe('KUSAKABE & MAENO TECH., INC.')
    expect(sheet.getCell('C3').value).toBe('Quotation')
    expect(sheet.getCell('B17').value).toContain('Construction')
    expect(sheet.getCell('H17').value).toBe('PRICE')
    expect(sheet.getColumn(8).width).toBeGreaterThanOrEqual(18)
    expect(sheet.getCell('H18').numFmt).toContain('#,##0')
    expect(sheet.getCell('A28').value).toBe('Total Amount')
    expect(sheet.getCell('A30').value).toContain('Upon receipt')
    expect(sheet.getCell('A35').value).toBe('Prepared by:')
    expect(sheet.getCell('E42').value).toBe('Received by:')
    expect(sheet.pageSetup.printArea).toBe('A1:H51')
  })

  it('creates the standard quotation layout locally', async () => {
    await exportToExcel({ ...exportData, layoutVariant: 'special' } as any)

    const [blob] = saveAsMock.mock.calls[0]
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(await blob.arrayBuffer())
    const sheet = workbook.getWorksheet('Quotation')!

    expect(sheet.getCell('A4').value).toBe('QUOTATION')
    expect(sheet.getCell('B17').value).toBe('REFERENCE NO.')
    expect(sheet.getCell('G17').value).toBe('PRICE')
    expect(sheet.getColumn(7).width).toBeGreaterThanOrEqual(18)
    expect(sheet.pageSetup.printArea).toBe('A1:G51')
  })

  it('creates the billing statement layout locally', async () => {
    await exportToExcel({
      ...exportData,
      mode: 'billing',
      layoutVariant: 'special',
      billingDetails: {
        invoiceNo: 'INV-53',
        jobOrderNo: 'JO-53',
        bankName: 'Test Bank',
      },
    } as any)

    const [blob] = saveAsMock.mock.calls[0]
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(await blob.arrayBuffer())
    const sheet = workbook.getWorksheet('Billing')!

    expect(sheet.getCell('A4').value).toBe('BILLING STATEMENT')
    expect(sheet.getCell('F10').value).toBe('INV-53')
    expect(sheet.getCell('G15').value).toBe('PRICE')
    expect(sheet.getCell('D44').value).toBe('Test Bank')
    expect(sheet.pageSetup.printArea).toBe('A1:G50')
  })
})
