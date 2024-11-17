import { useState } from 'react'
import {
  Button,
  Icon,
  Text,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@harnessio/canary'

interface ReviewersHeaderProps {
  usersList?: { display_name?: string; id?: number }[]
  addReviewers?: (id?: number) => void
  refetchReviewers: () => void
}

const ReviewersHeader = ({ usersList, addReviewers, refetchReviewers }: ReviewersHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <Text size={2} weight="medium">
        Reviewers
      </Text>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button size="sm" variant="ghost" className="text-tertiary-background px-2 py-1">
            <Icon name="vertical-ellipsis" size={12} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search users..." className="h-9" />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup>
                {usersList?.map(({ display_name, id }, idx: number) => (
                  <CommandItem
                    key={idx}
                    value={display_name}
                    onSelect={() => {
                      if (display_name) {
                        addReviewers?.(id)
                        setIsOpen(false)
                        refetchReviewers?.()
                      }
                    }}>
                    {display_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ReviewersHeader
