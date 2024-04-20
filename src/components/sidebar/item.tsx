'use client'

import { ChevronDown, LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import SubMenuItem from './sub-item'

interface ISidebarItem {
  name: string
  path: string
  icon: LucideIcon
  items?: ISubItem[]
}

interface ISubItem {
  name: string
  path: string
}

const SidebarItem = ({ item, isCollapsed }: { item: ISidebarItem; isCollapsed: boolean }) => {
  const { name, icon: Icon, items, path } = item
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const onClick = () => {
    if (items && items.length > 0) {
      setExpanded(!expanded)
    } else {
      router.push(path)
    }
  }

  const isActive = useMemo(
    () => items?.some(subItem => subItem.path === pathname) ?? path === pathname,
    [items, path, pathname],
  )

  return (
    <>
      <div
        className={`hover:bg-gray-200 flex cursor-pointer items-center justify-between rounded-lg p-3 ${
          isActive ? 'bg-gray-200' : ''
        }`}
        onClick={onClick}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            onClick()
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center space-x-2">
          {Icon && <Icon size={20} />}
          {!isCollapsed && <p className="text-base font-semibold">{name}</p>}
        </div>
        {/* Render ChevronDown only when sidebar is not collapsed and items exist */}
        {!isCollapsed && items && items.length > 0 && <ChevronDown size={18} />}
      </div>
      {expanded && items && (
        <div className={`ml-10 flex flex-col space-y-1 ${isCollapsed ? 'hidden' : 'block'}`}>
          {items.map(subItem => (
            <SubMenuItem key={subItem.path} item={subItem} isCollapsed={isCollapsed} />
          ))}
        </div>
      )}
    </>
  )
}

export default SidebarItem
