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

    expect(sheet.getCell('D1').value).toBe('KUSAKABE & MAENO TECH., INC.')
    expect(sheet.getCell('D1').font?.size).toBe(22)
    expect(sheet.getCell('D1').alignment?.horizontal).toBe('left')
    expect(sheet.getCell('D3').value).toBe('Quotation')
    expect(sheet.getCell('D3').alignment?.horizontal).toBe('center')
    expect(sheet.getCell('H5').value).toBe('KUSAKABE & MAENO TECH., INC.')
    expect(sheet.getCell('H9').value).toBe('TEL: +63-46-414-4009')
    expect(sheet.getCell('H5').alignment?.horizontal).toBe('right')
    expect(sheet.getCell('H9').alignment?.horizontal).toBe('right')
    expect(sheet.getCell('F12').value).toBe('Quotation NO.:')
    expect(sheet.getCell('H12').value).toBe('KMTE-53')
    ;[5.29, 12.43, 11.71, 9.71, 33, 7.71, 7, 27.86].forEach((width, index) => {
      expect(sheet.getColumn(index + 1).width).toBeCloseTo(width, 2)
    })
    ;[[1, 21.75], [2, 15.75], [3, 19.5], [4, 13.5], [5, 18], [17, 36.75]].forEach(([row, height]) => {
      expect(sheet.getRow(row).height).toBeCloseTo(height, 2)
    })
    expect(sheet.getCell('B17').value).toContain('Construction')
    expect(sheet.getCell('H17').value).toBe('PRICE')
    for (let column = 1; column <= 8; column++) {
      expect(sheet.getRow(17).getCell(column).font?.bold).toBe(true)
      expect(sheet.getRow(17).getCell(column).font?.size).toBe(10)
    }
    expect(sheet.getColumn(8).width).toBeGreaterThanOrEqual(18)
    expect(sheet.getCell('H18').numFmt).toContain('#,##0')
    expect(sheet.getCell('A28').value).toBe('Total Amount')
    expect(sheet.getCell('A30').value).toContain('Upon receipt')
    expect(sheet.getCell('A35').value).toBe('Prepared by:')
    expect(sheet.getCell('F42').value).toBe('Received by:')
    expect(sheet.getCell('G42').isMerged).toBe(true)
    expect(sheet.getCell('F45').border?.bottom?.style).toBe('medium')
    expect(sheet.getCell('H45').isMerged).toBe(true)
    expect(sheet.getCell('F46').value).toBe('(Signature Over Printed Name)')
    expect(sheet.getCell('H46').isMerged).toBe(true)
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
