/**
 * KemcoRow.tsx
 * ─────────────────────────────────────────────────────────────────
 * Renders the variant-specific table cells for the "KEMCO" layout.
 * Used by TaskRow when layoutVariant === 'kemco'.
 *
 * Columns: Machine Code | Unit Code | DWG No. | Start Date | End Date | Time | Action
 *
 * NOTE: This is the isolated component for upcoming KEMCO-specific
 * layout modifications.
 */

import { memo } from 'react'
import type { Task } from '../../../../../types/quotation'
import { focusNextInput } from '../utils/focusUtils'

export interface KemcoRowProps {
  task: Task
  isRowLocked: boolean
  onUpdate: (field: keyof Task, value: any) => void
  onRemove: () => void
}

export const KemcoRow = memo(({
  task, onUpdate, onRemove,
}: KemcoRowProps) => {

  return (
    <>
      {/* MACHINE CODE — Assembly only (level 0) */}
      <td>
        {task.level === 0 && (
          <input
            type="text"
            value={task.machineCode || ''}
            onChange={e => onUpdate('machineCode', e.target.value)}
            onKeyDown={focusNextInput}
            className="table-input"
          />
        )}
      </td>

      {/* UNIT CODE — Unit only (level 1) */}
      <td>
        {task.level === 1 && (
          <input
            type="text"
            value={task.unitCode || ''}
            onChange={e => onUpdate('unitCode', e.target.value)}
            onKeyDown={focusNextInput}
            className="table-input"
          />
        )}
      </td>

      {/* DWG No. — All levels */}
      <td>
        <input
          type="text"
          value={task.dwgNo || ''}
          onChange={e => onUpdate('dwgNo', e.target.value)}
          onKeyDown={focusNextInput}
          onMouseDown={e => e.stopPropagation()}
          className="table-input"
        />
      </td>

      {/* DESCRIPTION */}
      <td className="description-cell">
        <div className={`description-container level-${task.level || 0}`}>
          {(task.level || 0) > 0 && (
            <span className="sub-task-indicator">↳</span>
          )}
          <input
            type="text"
            value={task.description}
            onChange={e => onUpdate('description', e.target.value)}
            onKeyDown={focusNextInput}
            className="table-input description-input"
            placeholder={task.level === 0 ? 'Assembly Name' : task.level === 1 ? 'Sub-assembly name' : "Part's name"}
          />
        </div>
      </td>

      {/* START DATE */}
      <td>
        <input
          type="date"
          value={task.startDate || ''}
          onChange={e => onUpdate('startDate', e.target.value)}
          onKeyDown={focusNextInput}
          className="table-input date-input"
        />
      </td>

      {/* END DATE */}
      <td>
        <input
          type="date"
          value={task.endDate || ''}
          onChange={e => onUpdate('endDate', e.target.value)}
          onKeyDown={focusNextInput}
          className="table-input date-input"
        />
      </td>

      {/* TIME */}
      <td>
        <input
          type="text"
          value={task.time || ''}
          onChange={e => onUpdate('time', parseFloat(e.target.value) || 0)}
          onKeyDown={focusNextInput}
          className="table-input number-input"
        />
      </td>

      {/* TYPE */}
      <td className="type-cell">
        <select
          value={task.type || '3D'}
          onChange={e => onUpdate('type', e.target.value)}
          onKeyDown={focusNextInput}
          className="table-input type-select"
        >
          <option value="2D">2D</option>
          <option value="3D">3D</option>
          <option value="3D/2D">3D/2D</option>
        </select>
      </td>

      {/* ACTION */}
      <td className="action-cell">
        <div className="action-buttons-container">
          <button onClick={onRemove} className="remove-task-button" title="Remove">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </td>
    </>
  )
})

 KemcoRow.displayName = 'KemcoRow'
