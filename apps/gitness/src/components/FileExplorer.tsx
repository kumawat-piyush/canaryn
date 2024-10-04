import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FileExplorer } from '@harnessio/playground'
import { useGetContentQuery, OpenapiContentInfo, getContent } from '@harnessio/code-service-client'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { normalizeGitRef } from '../utils/git-utils'
import { PathParams } from '../RouteDefinitions'

interface ExplorerProps {
  selectedBranch: string
  fullResourcePath?: string
}

export default function Explorer({ selectedBranch, fullResourcePath }: ExplorerProps) {
  const [openFolderPaths, setOpenFolderPaths] = useState<string[]>([])
  const [folderContentsCache, setFolderContentsCache] = useState<{
    [folderPath: string]: OpenapiContentInfo[]
  }>({})
  const repoRef = useGetRepoRef()
  const { spaceId, repoId } = useParams<PathParams>()

  const { data: repoDetails } = useGetContentQuery({
    path: '',
    repo_ref: repoRef,
    queryParams: { include_commit: true, git_ref: normalizeGitRef(selectedBranch) }
  })

  const handleOpenFoldersChange = (newOpenFolderPaths: string[]) => {
    // Identify newly opened folders by comparing with the previous state
    const newlyOpenedFolders = newOpenFolderPaths.filter(folderPath => !openFolderPaths.includes(folderPath))

    // Fetch contents for any newly opened folders that haven't been fetched yet
    newlyOpenedFolders.forEach(folderPath => {
      if (!folderContentsCache[folderPath]) {
        fetchFolderContents(folderPath).then(contents => {
          setFolderContentsCache(prevContents => ({
            ...prevContents,
            [folderPath]: contents
          }))
        })
      }
    })
    // Update the state with the new open folder paths
    setOpenFolderPaths(newOpenFolderPaths)
  }

  const fetchFolderContents = async (folderPath: string): Promise<OpenapiContentInfo[]> => {
    try {
      const response = await getContent({
        path: folderPath,
        repo_ref: repoRef,
        queryParams: { include_commit: false, git_ref: normalizeGitRef(selectedBranch) }
      })
      return response?.content?.entries || []
    } catch (error) {
      console.error(`Error fetching contents for folder "${folderPath}":`, error)
      return []
    }
  }
  const renderEntries = (entries: OpenapiContentInfo[], parentPath: string = '') => {
    return entries.map((item, idx) => {
      // Construct the full path of the item
      const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name
      const fullPath = `/${spaceId}/repos/${repoId}/code/${selectedBranch}/~/${itemPath}`
      if (item.type === 'file') {
        return (
          <Link to={fullPath}>
            <FileExplorer.FileItem key={itemPath || idx.toString()} isActive={fullResourcePath === itemPath}>
              {item.name}
            </FileExplorer.FileItem>
          </Link>
        )
      } else {
        return (
          <FileExplorer.FolderItem
            key={itemPath || idx.toString()}
            value={itemPath}
            link={fullPath}
            isActive={fullResourcePath === itemPath}
            content={
              folderContentsCache[itemPath] ? (
                <FileExplorer.Root onValueChange={handleOpenFoldersChange}>
                  {renderEntries(folderContentsCache[itemPath], itemPath)}
                </FileExplorer.Root>
              ) : (
                <div>Loading...</div>
              )
            }>
            {item.name}
          </FileExplorer.FolderItem>
        )
      }
    })
  }

  return (
    <FileExplorer.Root onValueChange={handleOpenFoldersChange}>
      {repoDetails?.content?.entries?.length && renderEntries(repoDetails?.content?.entries)}
    </FileExplorer.Root>
  )
}
