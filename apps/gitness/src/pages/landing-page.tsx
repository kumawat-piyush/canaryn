import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MembershipSpacesOkResponse, membershipSpaces } from '@harnessio/code-service-client'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    membershipSpaces({
      queryParams: { page: 1, limit: 10, sort: 'identifier', order: 'asc' }
    })
      .then((memberships: MembershipSpacesOkResponse) => {
        if (memberships.length === 0) {
          navigate('/create-project')
        } else if (memberships[0]?.space?.path) {
          navigate(`${memberships[0].space.path}/repos`)
        }
      })
      .catch(_e => {
        /* Ignore/toast error */
      })
  }, [navigate])
  return null
}
