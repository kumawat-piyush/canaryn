import React from 'react'
import { Root as SearchBox } from './search-box'

interface ProjectProps {
  projects: {
    title: string
    icon?: React.ReactElement<SVGSVGElement>
  }[]
  name: string
  avatar: React.ReactElement<SVGSVGElement>
}

function Root({ avatar }: ProjectProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] w-full items-center gap-2.5 justify-items-start">
      <div className="flex items-center">{avatar}</div>
      <SearchBox textSize={1} width="full" placeholder="Search..." hasShortcut shortcutLetter="K" />
    </div>
  )
}

export { Root }
