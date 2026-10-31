import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SearchBox } from '../components/SearchBox'
import { homeDepartmentGroups, departments } from '../data/departments'
import { projects } from '../data/projects'

const commonProjectSlugs = [
  'blood-routine',
  'dr-xray',
  'ct',
  'ultrasound',
  'ecg',
  'gastroscopy',
  'pulmonary-function',
  'ocular-oct',
  'pure-tone-audiometry',
  'gynecologic-ultrasound',
]

export function HomePage() {
  useEffect(() => {
    document.title = '医院医疗项目科普｜看懂你要做的检查'
  }, [])

  const commonProjects = commonProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined)

  return (
    <div className="page page-home">
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-inner">
          <p className="hero-kicker">医院医疗项目科普</p>
          <h1 id="home-title">看懂你要做的检查</h1>
          <p className="hero-intro">
            从检查原理、准备事项，到过程中可能的感觉，用平实的语言说明白。
          </p>
          <div className="hero-search">
            <SearchBox />
          </div>
          <p className="hero-meta">
            9 个科室 · {projects.length} 个项目 · 内容仅供科普
          </p>
        </div>
      </section>

      <section className="home-section" aria-labelledby="departments-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">按科室查找</p>
            <h2 id="departments-heading">从你要去的地方开始</h2>
          </div>
          <Link className="section-link" to="/departments">
            查看全部科室
          </Link>
        </div>

        <div className="home-department-groups">
          {homeDepartmentGroups.map((group, groupIndex) => (
            <section className="home-department-group" key={group.title} aria-labelledby={`home-group-${groupIndex}`}>
              <h3 id={`home-group-${groupIndex}`} className="group-title">
                <span>{String(groupIndex + 1).padStart(2, '0')}</span>
                {group.title}
              </h3>
              <ul className="department-lines">
                {group.departments.map((department) => {
                  const count = projects.filter((project) => project.departmentSlug === department.slug).length
                  return (
                    <li key={department.slug}>
                      <Link to={`/departments/${department.slug}`}>
                        <span className="department-line-name">{department.name}</span>
                        <span className="department-line-summary">{department.summary}</span>
                        <span className="department-line-count">{count} 项</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="home-section home-section--common" aria-labelledby="common-projects-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">常见检查</p>
            <h2 id="common-projects-heading">你可能正在准备这些项目</h2>
          </div>
          <p className="section-note">共 {departments.length} 个科室，内容持续整理</p>
        </div>

        <ul className="common-project-list">
          {commonProjects.map((project, index) => {
            const department = departments.find((item) => item.slug === project.departmentSlug)
            return (
              <li key={project.slug}>
                <span className="common-index">{String(index + 1).padStart(2, '0')}</span>
                <Link to={`/projects/${project.slug}`}>{project.name}</Link>
                <span className="common-department">{department?.name}</span>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
