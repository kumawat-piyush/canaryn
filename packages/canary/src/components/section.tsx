import React from 'react'
import { Text } from './text'
import { Button } from './button'
import { Icon } from './icon'

// Section Root
function Root({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col w-full pt-8 border-t">{children}</div>
}

// Section Header
function Header({ name, actionText }: { name: string; actionText?: string }) {
  return (
    <div className="flex w-full gap-4 items-center justify-between pb-5">
      <Text as="p" size={4} color="primary" weight="medium">
        {name}
      </Text>
      {actionText && (
        <Text as="p" size={2} weight="medium" className="text-primary/80">
          {actionText}
        </Text>
      )}
    </div>
  )
}

// Section Content
function Content({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">{children}</div>
}

// Card Component
function Card({ title, subtitle, action }: { title: string; subtitle: string; action: string }) {
  return (
    <div className="flex flex-col items-start px-6 py-6 min-h-[220px]">
      <Text size={4} weight="medium">
        {title}
      </Text>
      <Text size={2} color="tertiaryBackground">
        {subtitle}
      </Text>
      <Button size="sm" className="mt-4">
        {action}
      </Button>
    </div>
  )
}

// Template Box Component
function TemplateBox({ name, iconName }: { name: string; iconName: string }) {
  return (
    <div className="rounded-md border flex flex-col items-center px-6 py-6 h-[220px]">
      <Icon name={iconName} size={64} />
      <Text size={3}>{name}</Text>
    </div>
  )
}

// Resource Box Component
function ResourceBox({
  title,
  arrowIconName,
  list
}: {
  title: string
  arrowIconName: string
  list: { iconName: string; name: string; subtitle: string }[]
}) {
  return (
    <div className="rounded-md border flex flex-col py-3 px-5 h-[220px] bg-muted/50">
      <div className="flex items-center justify-between mb-2">
        <Text size={2} weight="medium" color="tertiaryBackground">
          {title}
        </Text>
        <Icon name={arrowIconName} size={12} />
      </div>
      <div className="flex flex-col gap-1">
        {list.map((item, idx) => (
          <div className="grid grid-cols-[auto_1fr] auto-rows-auto gap-2 items-start" key={idx}>
            <Icon name={item.iconName} size={12} className="col-start-1 row-start-1 mt-1" />
            <div className="flex flex-col col-start-2 row-start-1">
              <Text size={1} color="primary">
                {item.name}
              </Text>
              <Text size={1} color="tertiaryBackground">
                {item.subtitle}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Root, Header, Content, Card, TemplateBox, ResourceBox }
