import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from '../components/Breadcrumb'
import { departmentGroups } from '../data/departments'
import { projects } from '../data/projects'

export function DepartmentsPage() {
  useEffect(() => {
    document.title = '科室总览｜医院医疗项目科普'
  }, [])

  return (
    <div className="page content-page">
      <Breadcrumb items={[{ label: '首页', to: '/' }, { label: '科室' }]} />

      <header className="page-heading">
        <p className="section-kicker">科室总览</p>
        <h1>沿着科室，找到你要了解的项目</h1>
        <p className="page-lead">
          九个科室按检查方向分组。每个科室页面都可以按无创、空腹、陪同等条件继续筛选。
        </p>
      </header>

      <div className="department-group-list">
        {departmentGroups.map((group, groupIndex) => (
          <section className="department-group" key={group.title} aria-labelledby={`department-group-${groupIndex}`}>
            <div className="department-group-heading">
              <span className="group-index" aria-hidden="true">
                {String(groupIndex + 1).padStart(2, '0')}
              </span>
              <h2 id={`department-group-${groupIndex}`}>{group.title}</h2>
              <span className="group-count">{group.departments.length} 个科室</span>
            </div>

            <ul className="department-overview-list">
              {group.departments.map((department) => {
                const departmentProjects = projects.filter(
                  (project) => project.departmentSlug === department.slug,
                )
                return (
                  <li key={department.slug}>
                    <Link to={`/departments/${department.slug}`} className="department-overview-row">
                      <span className="department-overview-main">
                        <span className="department-overview-name">{department.name}</span>
                        <span className="department-overview-summary">{department.summary}</span>
                      </span>
                      <span className="department-overview-count">{departmentProjects.length} 个项目</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
