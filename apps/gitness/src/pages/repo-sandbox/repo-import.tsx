import { SandboxRepoImportPage, ImportRepoFormType } from '@harnessio/playground'
import { useImportRepositoryMutation, ImportRepositoryRequestBody } from '@harnessio/code-service-client'
import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'

export const RepoImportContainer = () => {
  const spaceId = useGetSpaceURLParam()
  const { mutateAsync: importRepo, isLoading: importingRepo } = useImportRepositoryMutation({})

  const handleImportRepo = async (data: ImportRepoFormType) => {
    const body: ImportRepositoryRequestBody = {
      identifier: data.identifier,
      description: data.description,
      parent_ref: spaceId,
      pipelines: data.pipelines === true ? 'convert' : 'ignore',
      provider: {
        host: '',
        password: data.password,
        type: 'github',
        username: ''
      },
      provider_repo: `${data.organization}/${data.repository}`
    }
    importRepo({
      queryParams: { space_path: spaceId },
      body: body
    })
  }
  return <SandboxRepoImportPage handleImportRepo={handleImportRepo} isLoading={importingRepo} />
}
