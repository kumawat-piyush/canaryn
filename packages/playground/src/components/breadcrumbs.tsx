import React from 'react'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, cn } from '@harnessio/canary'
import AvatarDropdown from './avatar-dropdown'
interface BreadcrumbItemProps {
  label: string
  link?: string
  isLast: boolean
}
interface AvatarItemsProps {
  items: string[]
}

const BreadcrumbNavItem: React.FC<BreadcrumbItemProps> = ({ label, link, isLast }) => (
  <BreadcrumbItem>
    <BreadcrumbLink className={cn('font-normal text-navbar-text-secondary', { 'text-primary': isLast })} href={link}>
      {label}
    </BreadcrumbLink>
  </BreadcrumbItem>
)

// Breadcrumb Component
const Breadcrumbs: React.FC<{ isPrimary: boolean; items: BreadcrumbItemProps[]; avartarItems: AvatarItemsProps[] }> = ({
  items,
  avartarItems
}) => {
  const isOnlyPixelPoint = items.length === 0
  return (
    <Breadcrumb className="select-none">
      <BreadcrumbList>
        {/* Pixel Point item should be primary if it is the only breadcrumb item */}
        <BreadcrumbItem>
          <AvatarDropdown isPrimary={isOnlyPixelPoint} items={avartarItems} />
        </BreadcrumbItem>

        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <BreadcrumbSeparator className="font-thin">&nbsp;/&nbsp;</BreadcrumbSeparator>
            <BreadcrumbNavItem label={item.label} link={item.link} isLast={index === items.length - 1} />
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs
