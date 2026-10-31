import type { Project } from '../data/types'

interface InfoPanelProps {
  project: Project
}

const infoFields = [
  { label: '预计时长', key: 'duration' },
  { label: '是否需要空腹', key: 'fasting' },
  { label: '辐射情况', key: 'radiation' },
  { label: '是否需要家属陪同', key: 'escort' },
  { label: '报告出具时间', key: 'reportTime' },
] as const

export function InfoPanel({ project }: InfoPanelProps) {
  return (
    <aside className="info-panel" aria-labelledby="project-info-title">
      <div className="info-panel-heading">
        <p className="section-kicker">检查信息</p>
        <h2 id="project-info-title">开始之前</h2>
      </div>
      <dl>
        {infoFields.map((field) => (
          <div className="info-row" key={field.key}>
            <dt>{field.label}</dt>
            <dd>{project[field.key]}</dd>
          </div>
        ))}
        <div className="info-row">
          <dt>是否需要麻醉</dt>
          <dd>{project.sedation}</dd>
        </div>
      </dl>
      <p className="info-note">实际安排可能因医院、设备和检查部位不同而变化。</p>
    </aside>
  )
}
