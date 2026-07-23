import { describe,expect,it } from 'vitest'
import { getLocalDateISO,getLocalDateStamp } from '../dateTime'

describe('local date helpers', () => {
  it('uses local calendar fields instead of converting to UTC', () => {
    const localDate = new Date(2026, 6, 24, 0, 30)
    expect(getLocalDateISO(localDate)).toBe('2026-07-24')
  })

  it('creates a compact local date stamp for filenames', () => {
    const localDate = new Date(2026, 0, 5, 23, 59)
    expect(getLocalDateStamp(localDate)).toBe('20260105')
  })
})
