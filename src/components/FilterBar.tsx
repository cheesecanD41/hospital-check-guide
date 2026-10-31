import type { Project } from '../data/types'

export type FilterId = 'noninvasive' | 'radiation' | 'fasting' | 'escort' | 'sedation'

interface FilterOption {
  id: FilterId
  label: string
  matches: (project: Project) => boolean
}

export const filterOptions: FilterOption[] = [
  {
    id: 'noninvasive',
    label: '无创',
    matches: (project) => project.radiation === '无' && project.sedation === '否',
  },
  { id: 'radiation', label: '有辐射', matches: (project) => project.radiation !== '无' },
  { id: 'fasting', label: '需空腹', matches: (project) => project.fasting === '是' },
  { id: 'escort', label: '需家属陪同', matches: (project) => project.escort === '是' },
  { id: 'sedation', label: '需麻醉', matches: (project) => project.sedation === '是' },
]

interface FilterBarProps {
  selected: FilterId[]
  onChange: (next: FilterId[]) => void
  resultCount: number
  totalCount: number
}

export function FilterBar({ selected, onChange, resultCount, totalCount }: FilterBarProps) {
  const toggle = (id: FilterId) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id))
      return
    }
    onChange([...selected, id])
  }

  return (
    <section className="filter-panel" aria-labelledby="filter-title">
      <div className="filter-heading-row">
        <div>
          <h2 id="filter-title" className="filter-title">
            按检查条件筛选
          </h2>
          <p className="filter-help">多选条件为“满足任一项”，结果会即时更新。</p>
        </div>
        <p className="filter-count" role="status" aria-live="polite">
          {selected.length > 0 ? `已选 ${selected.length} 项 · ` : ''}
          显示 {resultCount} / {totalCount} 个项目
        </p>
      </div>

      <div className="filter-options" role="group" aria-label="检查条件">
        {filterOptions.map((option) => {
          const pressed = selected.includes(option.id)
          return (
            <button
              key={option.id}
              type="button"
              className="filter-chip"
              aria-pressed={pressed}
              onClick={() => toggle(option.id)}
            >
              {option.label}
            </button>
          )
        })}
        {selected.length > 0 && (
          <button type="button" className="filter-clear text-button" onClick={() => onChange([])}>
            清除筛选
          </button>
        )}
      </div>
    </section>
  )
}
