import { useNavigate } from 'react-router-dom'

import { SandboxRoot } from '@harnessio/ui/views'

import { useAppContext } from '../framework/context/AppContext'
import { handleLanguageChange } from '../i18n/i18n'

// import { useGetSpaceURLParam } from '../framework/hooks/useGetSpaceParam'

const RootWrapper = () => {
  const {
    currentUser
    // spaces
  } = useAppContext()
  // const spaceId = useGetSpaceURLParam()
  const navigate = useNavigate()
  return (
    <>
      <SandboxRoot
        logout={() => navigate('/logout')}
        currentUser={currentUser}
        pinnedMenu={null}
        recentMenu={[]}
        changePinnedMenu={_data => {}}
        changeRecentMenu={_data => {}}
        handleLanguageChange={handleLanguageChange}
      />
    </>
  )
}

export default RootWrapper
