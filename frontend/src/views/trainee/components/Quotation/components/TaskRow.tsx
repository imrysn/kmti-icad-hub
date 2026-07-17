import { memo, useCallback, useState, useEffect } from 'react'
import type { Task, TaskSubtotals } from '../../../../../types/quotation'
import { useAuth } from '../../../../../context/AuthContext'
import { KemcoRow } from './KemcoRow'

export type { TaskSubtotals } from '../../../../../types/quotation'

export interface TaskRowProps {
  task: Task
  subtotals: TaskSubtotals
  onUpdate?: (id: number, fieldOrUpdates: keyof Task | Partial<Task>, value?: any) => void
  onRemove?: (id: number) => void
  formatCurrency: (n: number) => string
  isSelected: boolean
  onMainTaskSelect?: (id: number) => void
  rowNumber: number
  isEditing: boolean
  onEditToggle?: (id: number) => void
  onEditValueUpdate?: (id: number, field: string, value: number, userModified?: boolean) => void
  isDragging: boolean
  isDragOver: boolean
  onDragStart?: (e: React.DragEvent, id: number) => void
  onDragOver?: (e: React.DragEvent, id: number) => void
  onDragLeave?: () => void
  onDrop?: (e: React.DragEvent, id: number) => void
  onDragEnd?: () => void
  hasSubTasks?: boolean
  isCollapsed?: boolean
  onToggleCollapse?: (e: React.MouseEvent, id: number) => void
  onCancelEdit?: () => void
  layoutVariant?: 'special' | 'kemco'
  trRef?: React.Ref<HTMLTableRowElement>
  isRowLocked?: boolean
}

export const TaskRow = memo(({
  task, subtotals, onUpdate, onRemove, formatCurrency,
  isSelected, onMainTaskSelect, rowNumber,
  isEditing, onEditToggle, onEditValueUpdate,
  isDragging, isDragOver,
  onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd,
  hasSubTasks, isCollapsed, onToggleCollapse,
  onCancelEdit, layoutVariant, trRef,
}: TaskRowProps) => {
  const [localTotal, setLocalTotal] = useState<string>('')

  const isRowLocked = false

  useEffect(() => {
    if (isEditing) {
      setLocalTotal(subtotals.total.toString())
    }
  }, [isEditing, subtotals.total])

  const handleUpdate = useCallback(
    (field: keyof Task, value: any) => onUpdate?.(task.id, field, value),
    [task.id, onUpdate],
  )
  const handleRemove = useCallback(() => onRemove?.(task.id), [task.id, onRemove])
  const handleEditToggle = useCallback(() => onEditToggle?.(task.id), [task.id, onEditToggle])

  const handleMainTaskClick = useCallback(() => {
    // Selection works on any row for KEMCO format
    if (onMainTaskSelect) onMainTaskSelect(task.id)
  }, [task.id, onMainTaskSelect])


  return (
    <tr
      ref={trRef}
      className={[
        task.isMainTask ? 'main-task-row' : 'sub-task-row',
        isSelected ? 'selected-main-task' : '',
        isDragging ? 'dragging' : '',
        isDragOver ? 'drag-over' : '',
        `layout-kemco`,
        `level-${task.level || 0}`
      ].filter(Boolean).join(' ')}
      onClick={handleMainTaskClick}
      draggable={true}
      onDragStart={e => onDragStart?.(e, task.id)}
      onDragOver={e => onDragOver?.(e, task.id)}
      onDragLeave={onDragLeave}
      onDrop={e => onDrop?.(e, task.id)}
      onDragEnd={onDragEnd}
    >
      {/* NO. */}
      <td className="row-number-cell">
        <div className="row-number-container">
          {task.isMainTask && hasSubTasks && (
            <button
              className="collapse-toggle-btn"
              onClick={e => onToggleCollapse?.(e, task.id)}
              title={isCollapsed ? 'Expand parts' : 'Collapse parts'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" style={{ transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transformOrigin: 'center', transition: 'transform 0.2s' }} />
              </svg>
            </button>
          )}
          <span className="row-number">{rowNumber}</span>
        </div>
      </td>

      {/* REFERENCE NO / CONST NO */}
      <td className="reference-cell">
        {((task.level || 0) === 0) && (
          <input
            type="text"
            value={task.referenceNumber || ''}
            onChange={e => handleUpdate('referenceNumber', e.target.value)}
            className="table-input reference-input"
          />
        )}
      </td>

      <KemcoRow
        task={task} isRowLocked={isRowLocked}
        onUpdate={handleUpdate} onRemove={handleRemove}
      />
    </tr>
  )
})

TaskRow.displayName = 'TaskRow'
