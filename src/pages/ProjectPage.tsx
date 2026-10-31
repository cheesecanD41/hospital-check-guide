import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb } from '../components/Breadcrumb'
import { InfoPanel } from '../components/InfoPanel'
import { departments } from '../data/departments'
import { projects } from '../data/projects'
import type { Project } from '../data/types'

function getDepartmentReturnState(slug: string) {
  const saved = Number(sessionStorage.getItem(`department-scroll:${slug}`) ?? '0')
  return { restoreScroll: Number.isFinite(saved) ? saved : 0 }
}

function ListChapter({
  number,
  title,
  items,
  ordered = false,
}: {
  number: string
  title: string
  items: string[]
  ordered?: boolean
}) {
  return (
    <section className="article-section" aria-labelledby={`chapter-${number}`}>
      <div className="chapter-heading">
        <span className="chapter-number" aria-hidden="true">
          {number}
        </span>
        <h2 id={`chapter-${number}`}>{title}</h2>
      </div>
      {ordered ? (
        <ol className="article-list article-list--ordered">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="article-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

function RelatedRow({ project }: { project: Project }) {
  const department = departments.find((item) => item.slug === project.departmentSlug)
  return (
    <li>
      <Link to={`/projects/${project.slug}`} className="related-row">
        <span>
          <span className="related-name">{project.name}</span>
          <span className="related-note">
            {department?.name} · {project.oneLine}
          </span>
        </span>
        <span className="related-duration">{project.duration}</span>
      </Link>
    </li>
  )
}

export function ProjectPage() {
  const { projectSlug } = useParams()
  const project = projects.find((item) => item.slug === projectSlug)
  const department = departments.find((item) => item.slug === project?.departmentSlug)

  useEffect(() => {
    if (project) document.title = `${project.name}｜医院医疗项目科普`
  }, [project])

  if (!project || !department) {
    return (
      <div className="page content-page">
        <Breadcrumb items={[{ label: '首页', to: '/' }, { label: '科室', to: '/departments' }, { label: '未找到项目' }]} />
        <div className="empty-page">
          <h1>没有找到这个项目</h1>
          <p>项目链接可能已经变化，可以返回科室总览重新查找。</p>
          <Link className="outline-button" to="/departments">
            返回科室总览
          </Link>
        </div>
      </div>
    )
  }

  const sameDepartmentProjects = projects
    .filter((item) => item.departmentSlug === department.slug && item.slug !== project.slug)
    .slice(0, 3)

  const relatedSupplement =
    sameDepartmentProjects.length < 3
      ? projects
          .filter(
            (item) =>
              item.slug !== project.slug &&
              !sameDepartmentProjects.some((same) => same.slug === item.slug) &&
              item.tags.some((tag) => project.tags.includes(tag)),
          )
          .slice(0, 3 - sameDepartmentProjects.length)
      : []

  const departmentReturnState = getDepartmentReturnState(department.slug)

  return (
    <div className="page content-page project-page">
      <Breadcrumb
        items={[
          { label: '首页', to: '/' },
          { label: '科室', to: '/departments' },
          { label: department.name, to: `/departments/${department.slug}`, state: departmentReturnState },
          { label: project.name },
        ]}
      />

      <header className="project-heading">
        <div className="project-title-block">
          <p className="section-kicker">
            <Link to={`/departments/${department.slug}`} state={departmentReturnState}>
              {department.name}
            </Link>
          </p>
          <h1>{project.name}</h1>
          {project.alias.length > 0 && (
            <p className="project-alias">又称：{project.alias.join(' · ')}</p>
          )}
          <p className="project-one-line">{project.oneLine}</p>
        </div>
        <div className="project-tags" aria-label="项目标签">
          {project.tags.slice(0, 5).map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="project-layout">
        <article className="project-article">
          <section className="article-section" aria-labelledby="chapter-01">
            <div className="chapter-heading">
              <span className="chapter-number" aria-hidden="true">01</span>
              <h2 id="chapter-01">原理</h2>
            </div>
            <p>{project.principle}</p>
          </section>

          <ListChapter number="02" title="适合什么情况" items={project.suitable} />
          <ListChapter number="03" title="需要怎么准备" items={project.preparation} />
          <ListChapter number="04" title="检查过程" items={project.process} ordered />

          <section className="article-section" aria-labelledby="chapter-05">
            <div className="chapter-heading">
              <span className="chapter-number" aria-hidden="true">05</span>
              <h2 id="chapter-05">过程中会有什么感觉</h2>
            </div>
            <p>{project.feeling}</p>
          </section>

          <section className="article-section" aria-labelledby="chapter-06">
            <div className="chapter-heading">
              <span className="chapter-number" aria-hidden="true">06</span>
              <h2 id="chapter-06">结果怎么看</h2>
            </div>
            <p>{project.resultReading}</p>
          </section>

          <ListChapter number="07" title="注意事项" items={project.cautions} />

          <section className="article-section" aria-labelledby="chapter-08">
            <div className="chapter-heading">
              <span className="chapter-number" aria-hidden="true">08</span>
              <h2 id="chapter-08">常见疑问</h2>
            </div>
            <div className="faq-list">
              {project.faq.map((item, index) => (
                <div className="faq-item" key={item.q}>
                  <p className="faq-question">
                    <span aria-hidden="true">问{String(index + 1).padStart(2, '0')}</span>
                    {item.q}
                  </p>
                  <p className="faq-answer">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="hospital-note">具体流程以所在医院为准。</p>
        </article>

        <InfoPanel project={project} />
      </div>

      <section className="related-section" aria-labelledby="related-heading">
        <div className="section-heading section-heading--compact">
          <div>
            <p className="section-kicker">继续浏览</p>
            <h2 id="related-heading">同科室其他项目</h2>
          </div>
          <Link className="section-link" to={`/departments/${department.slug}`} state={departmentReturnState}>
            返回{department.name}
          </Link>
        </div>
        <ul className="related-list">
          {sameDepartmentProjects.map((item) => (
            <RelatedRow key={item.slug} project={item} />
          ))}
        </ul>

        {relatedSupplement.length > 0 && (
          <div className="related-supplement">
            <h3>相关检查</h3>
            <ul className="related-list">
              {relatedSupplement.map((item) => (
                <RelatedRow key={item.slug} project={item} />
              ))}
            </ul>
          </div>
        )}

        {sameDepartmentProjects.length === 0 && relatedSupplement.length === 0 && (
          <p className="muted">该科室暂无其他项目。</p>
        )}
      </section>
    </div>
  )
}
