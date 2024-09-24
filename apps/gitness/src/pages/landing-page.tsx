import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../framework/context/AppContext'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { spaces, setSelectedSpace } = useAppContext()
  if (spaces[0]?.space?.path) {
    setSelectedSpace(spaces[0].space.path)
    navigate(`/${spaces[0].space.path}/repos`)
  }
  return null
}
