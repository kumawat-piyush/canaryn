import { useEffect, useState } from 'react'
import { TopBarWidget, Project } from '@harnessio/playground'
import { useNavigate } from 'react-router-dom'
import { TypesMembershipSpace } from '@harnessio/code-service-client'
import { useAppContext } from '../framework/context/AppContext'
import { useGetSpaceURLParam } from '../framework/hooks/useGetSpaceParam'

export default function Header() {
  const navigate = useNavigate()
  const space = useGetSpaceURLParam()
  const { spaces } = useAppContext()
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined)

  useEffect(() => {
    if (spaces.length > 0) {
      const _projects = spaces.map((space: TypesMembershipSpace) => ({
        id: space?.space?.id,
        name: space?.space?.path
      }))
      setProjects([..._projects, { id: 'create-project', name: '+ Create a new project' }])
    }
  }, [spaces])

  useEffect(() => setSelectedProject(projects.find(item => item.name === space)), [space, projects])

  return (
    <TopBarWidget
      projects={projects}
      onSelectProject={(project: Project) => {
        setSelectedProject(project)
        if (project?.id === 'create-project') {
          navigate('/create-project')
        } else if (project?.name) {
          navigate(`/${project.name}/repos`)
        }
      }}
      preselectedProject={selectedProject}
    />
  )
}
