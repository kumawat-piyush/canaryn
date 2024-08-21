import { Badge, Icon, Spacer, StackedList, Text } from '@harnessio/canary'
import React from 'react'
import { Link } from 'react-router-dom'

interface Repo {
  id: string
  name: string
  description?: string
  private: boolean
  stars: number
  forks: number
  pulls: number
}

interface PageProps {
  pageTitle: string
  repos?: Repo[]
}

const Stats = ({ stars, forks, pulls }: { stars: number; forks: number; pulls: number }) => (
  <div className="flex gap-3 justify-end items-center select-none font-medium">
    <span className="flex gap-1.5 items-center">
      <Icon size={12} name="archive" className="text-tertiary-background" />
      <span className="text-primary text-[12px] font-medium">{stars || 0}</span>
    </span>
    <span className="flex gap-1.5 items-center">
      <Icon size={12} name="archive" className="text-tertiary-background" />
      <span className="text-primary text-[12px] font-medium">{forks || 0}</span>
    </span>
    <span className="flex gap-1.5 items-center">
      <Icon size={12} name="archive" className="text-tertiary-background" />
      <span className="text-primary text-[12px] font-medium">{pulls || 0}</span>
    </span>
  </div>
)

const Title = ({ title, isPrivate }: { title: string; isPrivate: boolean }) => (
  <>
    {title}
    <Badge
      className={`select-none bg-transparent rounded-2xl text-[12px] font-light ml-2.5 py-1 px-2 leading-none text-[#71dbd3] border-[#1d3333] bg-[#111c1d] hover:bg-inherit ${
        isPrivate && 'border-[#242428] bg-[#151518] text-[#93939f]'
      }`}>
      {isPrivate ? 'Private' : 'Public'}
    </Badge>
  </>
)

export default function RepoList({ ...props }: PageProps) {
  const { pageTitle, repos } = props

  return (
    // TODO: get layout componentized, this wrapper div is just for quick presentation!
    <div className="px-16 py-16 max-w-[1200px] min-w-[770px] mx-auto">
      <Text size={6}>{pageTitle}</Text>
      <Spacer size={6} />
      <StackedList.Root>
        {repos &&
          repos.map(repo => (
            <StackedList.Item key={repo.name} asChild>
              <Link to={`/repos/${repo.name}`}>
                <StackedList.Field
                  description={repo.description}
                  title={<Title title={repo.name} isPrivate={repo.private} />}
                />
                <StackedList.Field
                  title={
                    <>
                      Updated <em>2 hours ago</em>
                    </>
                  }
                  description={<Stats stars={repo.stars} forks={repo.forks} pulls={repo.pulls} />}
                  right
                  label
                />
              </Link>
            </StackedList.Item>
          ))}
        {!repos && (
          <></> // Handle loading/no items
        )}
      </StackedList.Root>
    </div>
  )
}
