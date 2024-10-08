import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../framework/context/AppContext'
import { useEffect } from 'react'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { spaces } = useAppContext()
  useEffect(() => {
    if (!spaces || !spaces.length) return
    const preSelectedProject = spaces[0]
    if (preSelectedProject?.space?.path) {
      navigate(`${preSelectedProject.space.path}/repos`)
    }
  }, [spaces])
  return null
}
