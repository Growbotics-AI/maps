'use client'

import { HelpCircle, List, LogIn, LogOut, LucideIcon, MapPin, Settings } from 'lucide-react'
import { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import SidebarItem from './item'

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

const items: ISidebarItem[] = [
  {
    name: 'Map',
    path: '/',
    icon: MapPin,
  },
  // 'My Listings' and its sub-items only appear if the user is signed in
  {
    name: 'My Listings',
    path: '/my-listings',
    icon: List,
    items: [
      {
        name: 'Add Listing',
        path: '/my-listings/add',
      },
      {
        name: 'Claim Listing',
        path: '/my-listings/claim',
      },
    ],
  },
  {
    name: 'Support',
    path: '/support',
    icon: HelpCircle,
  },
  // 'Settings' only appears if the user is signed in
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
  },
  // 'Sign In/Sign Out' changes dynamically based on the user's authentication state
  {
    name: 'Sign In',
    path: '/signin',
    icon: LogIn,
    // This will be LogOut if the user is signed in
  },
  {
    name: 'Sign Out',
    path: '/signout',
    icon: LogOut,
    // This will be LogOut if the user is signed in
  },
]

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={`fixed top-[60px] left-0 h-[calc(100vh-60px)] ${
        isCollapsed ? 'w-12' : 'w-48'
      } transition-width z-10 bg-white shadow-lg duration-300`}
    >
      {/* Adjust the top style to push the button down enough to clear the top navigation bar */}
      <button type="button" className="collapse-btn" onClick={toggleCollapse}>
        {/* Adjust 60px as needed to match the top bar height */}
        {isCollapsed ? <MdKeyboardArrowRight size={24} /> : <MdKeyboardArrowLeft size={24} />}
      </button>
      {/* Add padding-top to this div to push the content down below the collapse button */}
      <div className="w-full flex-col space-y-10 pt-16">
        {/* Adjust the padding-top (pt-12) as necessary */}
        <div className="flex flex-col space-y-2">
          {items.map(item => (
            <SidebarItem key={item.path} item={item} isCollapsed={isCollapsed} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
