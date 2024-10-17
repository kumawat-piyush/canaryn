import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppContext } from '../framework/context/AppContext'
import { TypesSpace, getUser, membershipSpaces } from '@harnessio/code-service-client'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { setCurrentUser, setSpaces } = useAppContext()

  useEffect(() => {
    Promise.all([
      membershipSpaces({
        queryParams: { page: 1, limit: 10, sort: 'identifier', order: 'asc' }
      }),
      getUser({})
    ])
      .then(([memberships, user]) => {
        setCurrentUser(user)

        const spaceList = memberships.filter(item => item?.space).map(item => item.space as TypesSpace)
        setSpaces(memberships.filter(item => item?.space).map(item => item.space as TypesSpace))
        if (spaceList.length === 0) navigate('/create-project')
        if (spaceList?.[0]?.path) navigate(`${spaceList[0].path}/repos`)
      })
      .catch(_e => {
        // Ignore/toast error
      })
  }, [])

  return null
}
