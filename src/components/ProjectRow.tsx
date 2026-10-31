import { Link } from 'react-router-dom'
import type { Project } from '../data/types'

interface ProjectRowProps {
  project: Project
  index: number
  onOpen?: () => void
}

export function ProjectRow({ project, index, onOpen }: ProjectRowProps) {
  return (
    <li className="project-row">
      <Link
        to={`/projects/${project.slug}`}
        className="project-row-link"
        onClick={onOpen}
        aria-label={`查看${project.name}详情`}
      >
        <span className="project-number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="project-row-main">
          <span className="project-row-name">{project.name}</span>
          <span className="project-row-principle">{project.oneLine}</span>
        </span>
        <span className="project-duration">{project.duration}</span>
      </Link>
    </li>
  )
}
