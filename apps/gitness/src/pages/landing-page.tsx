import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppContext } from '../framework/context/AppContext'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { spaces } = useAppContext()

  useEffect(() => {
    if (spaces.length === 0) navigate('/create-project')
    if (spaces?.[0]?.path) navigate(`${spaces[0].path}/repos`)
  }, [spaces])

  return null
}
