'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

interface ISubItem {
  name: string
  path: string
}

interface SubMenuItemProps {
  item: ISubItem
  isCollapsed: boolean
}

const SubMenuItem = ({ item, isCollapsed }: SubMenuItemProps) => {
  const { name, path } = item
  const router = useRouter()
  const pathname = usePathname()

  const onClick = () => {
    router.push(path)
  }

  const isActive = useMemo(() => path === pathname, [path, pathname])

  return (
    <div
      className={`hover:text-sidebar-active cursor-pointer text-base hover:font-semibold ${
        isActive ? 'text-sidebar-active font-semibold' : ''
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
      {!isCollapsed && name}
    </div>
  )
}

export default SubMenuItem
