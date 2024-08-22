// RepoLayout.tsx
import React from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'

const PipelineLayout: React.FC = () => {
  const { repoId } = useParams<{ repoId: string }>()
  const { pipelineId } = useParams<{ pipelineId: string }>()

  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="flex p-3 px-8 gap-5">
        <NavLink
          to={`/repos/${repoId}/pipelines/${pipelineId}`}
          style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}
          end>
          Index
        </NavLink>
        <NavLink to={`edit`} style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
          Edit
        </NavLink>
      </div>
      <hr className="my-1.25rem" />
      <Outlet />
    </div>
  )
}

export default PipelineLayout
