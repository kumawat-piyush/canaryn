// RepoLayout.tsx
import React from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import DefaultHeaderLayout from './DefaultHeaderLayout'
import NavLayout from './NavLayout'

const RepoLayout: React.FC = () => {
  const { repoId } = useParams<{ repoId: string }>()

  return (
    <div>
      <DefaultHeaderLayout>
        <h1>Repository {repoId}</h1>
      </DefaultHeaderLayout>
      <header className="p-5 h-16">
        <div className="flex gap-2.5">
          <NavLayout className="" customized={''}>
            <NavLink to={`/repos/${repoId}`} style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })} end>
              Index
            </NavLink>
            <NavLink to="pipelines" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
              Pipelines
            </NavLink>
            <NavLink to="commits" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
              Commits
            </NavLink>
            <NavLink to="pull-requests" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
              Pull requests
            </NavLink>
            <NavLink to="branches" style={({ isActive }) => ({ color: isActive ? 'green' : 'inherit' })}>
              Branches
            </NavLink>
          </NavLayout>
        </div>
      </header>
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default RepoLayout
