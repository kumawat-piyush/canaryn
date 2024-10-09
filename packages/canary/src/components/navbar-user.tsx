import React from 'react'
import { getInitials } from '@/utils/StringUtils'
import { Avatar, AvatarFallback, AvatarImage } from '..'

const Root: React.FC<{
  username: string
  profile: string
  url?: string
}> = ({ username, profile, url }) => {
  return (
    <div className="grid grid-rows-2 grid-cols-[auto_1fr] gap-x-3 items-center justify-start cursor-pointer">
      <div className="col-start-1 row-span-2">
        <Avatar>
          {url && <AvatarImage src={url} alt="user" />}
          <AvatarFallback>{getInitials(username)}</AvatarFallback>
        </Avatar>
      </div>
      <p className="col-start-2 row-start-1 text-xs text-primary font-medium">{username}</p>
      <p className="col-start-2 row-start-2 text-xs font-normal text-tertiary-background">{profile}</p>
    </div>
  )
}

export { Root }
