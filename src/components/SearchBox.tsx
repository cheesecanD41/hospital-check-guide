import { useEffect, useId, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { departments } from '../data/departments'
import { projects } from '../data/projects'

interface SearchBoxProps {
  variant?: 'hero' | 'nav'
  autoFocus?: boolean
  onNavigate?: () => void
}

function useDebouncedValue(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])

  return debounced
}

function normalize(value: string) {
  return value.toLocaleLowerCase('zh-CN').replace(/\s+/g, '')
}

export function SearchBox({ variant = 'hero', autoFocus = false, onNavigate }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query.trim(), 200)
  const listId = useId()
  const inputId = useId()

  const normalizedQuery = normalize(debouncedQuery)

  const departmentMatches = useMemo(() => {
    if (!normalizedQuery) return []
    return departments.filter((department) => normalize(department.name).includes(normalizedQuery))
  }, [normalizedQuery])

  const projectMatches = useMemo(() => {
    if (!normalizedQuery) return []
    return projects.filter((project) => {
      const searchable = [project.name, ...project.alias, ...project.tags].map(normalize)
      return searchable.some((value) => value.includes(normalizedQuery))
    })
  }, [normalizedQuery])

  const hasQuery = query.trim().length > 0
  const hasSettledResults = debouncedQuery.length > 0
  const total = departmentMatches.length + projectMatches.length

  return (
    <div className={`search-box search-box--${variant}`}>
      <label className="sr-only" htmlFor={inputId}>
        搜索科室、检查项目或别名
      </label>
      <div className="search-input-wrap">
        <span className="search-input-prefix" aria-hidden="true">
          搜索
        </span>
        <input
          id={inputId}
          className="search-input"
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="输入检查项目、科室或别名，如“核磁”"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={hasQuery}
        />
        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={() => setQuery('')}
            aria-label="清空搜索内容"
          >
            清空
          </button>
        )}
      </div>

      {hasQuery && (
        <div id={listId} className="search-results" aria-live="polite">
          {hasSettledResults && total === 0 && (
            <div className="search-empty">
              <p>没有找到相关结果。</p>
              <p className="muted">换个说法试试，也可以只输入项目名的一部分。</p>
            </div>
          )}

          {hasSettledResults && total > 0 && (
            <>
              <p className="search-summary">找到 {total} 项结果</p>
              {departmentMatches.length > 0 && (
                <section className="search-group" aria-labelledby={`${listId}-departments`}>
                  <h2 id={`${listId}-departments`} className="search-group-title">
                    科室
                  </h2>
                  <ul className="search-result-list">
                    {departmentMatches.map((department) => (
                      <li key={department.slug}>
                        <Link to={`/departments/${department.slug}`} onClick={onNavigate}>
                          <span className="search-result-name">{department.name}</span>
                          <span className="search-result-note">{department.summary}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {projectMatches.length > 0 && (
                <section className="search-group" aria-labelledby={`${listId}-projects`}>
                  <h2 id={`${listId}-projects`} className="search-group-title">
                    项目
                  </h2>
                  <ul className="search-result-list">
                    {projectMatches.map((project) => {
                      const department = departments.find((item) => item.slug === project.departmentSlug)
                      return (
                        <li key={project.slug}>
                          <Link to={`/projects/${project.slug}`} onClick={onNavigate}>
                            <span className="search-result-name">{project.name}</span>
                            <span className="search-result-note">
                              {department?.name}
                              {project.alias.length > 0 ? ` · ${project.alias.join(' / ')}` : ''}
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )}
            </>
          )}

          {!hasSettledResults && <p className="search-typing">正在查找…</p>}
        </div>
      )}
    </div>
  )
}
