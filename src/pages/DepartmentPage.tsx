import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb } from '../components/Breadcrumb'
import { FilterBar, filterOptions, type FilterId } from '../components/FilterBar'
import { ProjectRow } from '../components/ProjectRow'
import { departments } from '../data/departments'
import { projects } from '../data/projects'

export function DepartmentPage() {
  const { departmentSlug } = useParams()
  const department = departments.find((item) => item.slug === departmentSlug)
  const [selectedFilters, setSelectedFilters] = useState<FilterId[]>([])

  useEffect(() => {
    if (department) document.title = `${department.name}｜医院医疗项目科普`
  }, [department])

  const departmentProjects = useMemo(
    () => projects.filter((project) => project.departmentSlug === departmentSlug),
    [departmentSlug],
  )

  const filteredProjects = useMemo(() => {
    if (selectedFilters.length === 0) return departmentProjects
    return departmentProjects.filter((project) =>
      selectedFilters.some((filterId) => {
        const option = filterOptions.find((item) => item.id === filterId)
        return option ? option.matches(project) : false
      }),
    )
  }, [departmentProjects, selectedFilters])

  if (!department) {
    return (
      <div className="page content-page">
        <Breadcrumb items={[{ label: '首页', to: '/' }, { label: '科室', to: '/departments' }, { label: '未找到科室' }]} />
        <div className="empty-page">
          <h1>没有找到这个科室</h1>
          <p>科室链接可能已经变化，可以返回科室总览重新选择。</p>
          <Link className="outline-button" to="/departments">
            返回科室总览
          </Link>
        </div>
      </div>
    )
  }

  const handleOpenProject = () => {
    sessionStorage.setItem(`department-scroll:${department.slug}`, String(window.scrollY))
  }

  return (
    <div className="page content-page department-page">
      <Breadcrumb
        items={[
          { label: '首页', to: '/' },
          { label: '科室', to: '/departments' },
          { label: department.name },
        ]}
      />

      <header className="department-heading">
        <div className="department-heading-main">
          <p className="section-kicker">{department.category}</p>
          <h1>{department.name}</h1>
          <p className="page-lead">{department.intro}</p>
        </div>
        <div className="department-heading-meta" aria-label="科室概览">
          <span className="large-number">{String(departmentProjects.length).padStart(2, '0')}</span>
          <span>个项目</span>
        </div>
      </header>

      <FilterBar
        selected={selectedFilters}
        onChange={setSelectedFilters}
        resultCount={filteredProjects.length}
        totalCount={departmentProjects.length}
      />

      <section className="department-projects" aria-labelledby="department-projects-heading">
        <div className="section-heading section-heading--compact">
          <h2 id="department-projects-heading">项目列表</h2>
          <Link className="section-link" to="/departments">
            查看其他科室
          </Link>
        </div>

        {filteredProjects.length > 0 ? (
          <ul className="project-list" key={selectedFilters.join('-') || 'all'}>
            {filteredProjects.map((project, index) => (
              <ProjectRow key={project.slug} project={project} index={index} onOpen={handleOpenProject} />
            ))}
          </ul>
        ) : (
          <div className="empty-filter" role="status">
            <p>当前筛选条件下没有项目。</p>
            <button type="button" className="outline-button" onClick={() => setSelectedFilters([])}>
              清除筛选
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
