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
  {
    name: 'My Listings',
    path: '/my-listings',
    icon: List,
    items: [
      { name: 'Listings', path: '/my-listings' },
      { name: 'Add Listing', path: '/my-listings/add' },
      { name: 'Claim Listing', path: '/my-listings/claim' },
    ],
  },
  {
    name: 'Support',
    path: '/support',
    icon: HelpCircle,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
  },
  {
    name: 'Sign In',
    path: '/signin',
    icon: LogIn,
  },
  {
    name: 'Sign Out',
    path: '/signout',
    icon: LogOut,
  },
]

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <aside
      className={`flex flex-col ${
        isCollapsed ? 'w-12' : 'w-48'
      } z-10 h-screen bg-white shadow-lg duration-300`}
    >
      <button type="button" className="self-end p-3" onClick={toggleCollapse}>
        {isCollapsed ? <MdKeyboardArrowRight size={24} /> : <MdKeyboardArrowLeft size={24} />}
      </button>
      <nav className="flex grow flex-col space-y-2">
        {items.map(item => (
          <SidebarItem key={item.path} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
