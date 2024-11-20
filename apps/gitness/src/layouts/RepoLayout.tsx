import { SandboxLayout } from '@harnessio/views'
import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
// import common_en from '../i18n/common-en.json'

const RepoLayout: React.FC = () => {
  const { t, i18n } = useTranslation(['common'])

  // Load namespace when component mounts
  useEffect(() => {
    i18n.changeLanguage('en')
  }, [i18n])

  const baseClasses = 'h-full text-center flex items-center'

  const getLinkClasses = (isActive: boolean) =>
    `${baseClasses} ${isActive ? 'text-primary border-b border-primary' : 'text-tertiary-background hover:text-primary'}`

  return (
    <>
      <SandboxLayout.SubHeader>
        <div className="text-muted-foreground border-border-background inline-flex h-[44px] w-full items-center justify-start gap-6 border-b px-8">
          <NavLink to="summary" className={({ isActive }) => getLinkClasses(isActive)}>
            {t('Summary')}
          </NavLink>
          <NavLink to="code" className={({ isActive }) => getLinkClasses(isActive)}>
            {t('Files')}
          </NavLink>
          <NavLink to="pipelines" className={({ isActive }) => getLinkClasses(isActive)}>
            {t('Pipeline')}
          </NavLink>
          <NavLink to="commits" className={({ isActive }) => getLinkClasses(isActive)}>
            {t('Commits')}
          </NavLink>
          <NavLink to="pull-requests" className={({ isActive }) => getLinkClasses(isActive)}>
            {t('Pull Requests')}
          </NavLink>
          <NavLink to="webhooks" className={({ isActive }) => getLinkClasses(isActive)}>
            {t('Webhooks')}
          </NavLink>
          <NavLink to="branches" className={({ isActive }) => getLinkClasses(isActive)}>
            {t('Branches')}
          </NavLink>
          <NavLink to="settings" className={({ isActive }) => getLinkClasses(isActive)}>
            {t('Settings')}
          </NavLink>
        </div>
      </SandboxLayout.SubHeader>
      <Outlet />
    </>
  )
}

export default RepoLayout
