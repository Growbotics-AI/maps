import { Search, Sliders } from 'lucide-react'

import { AppConfig, NavMenuVariant } from '#lib/AppConfig'

interface NavMenuProps {
  variant?: NavMenuVariant
}

const NavMenu = ({ variant = NavMenuVariant.TOPNAV }: NavMenuProps) => {
  const navIconSize = AppConfig.ui.topBarIconSize

  // Determine the appropriate CSS classes based on the variant
  const menuClasses =
    variant === NavMenuVariant.TOPNAV
      ? 'flex items-center w-full max-w-3xl px-3 py-2 bg-white shadow-sm rounded-md'
      : 'flex flex-col items-start'

  return (
    <div className="flex w-full items-center justify-center">
      <div className={menuClasses}>
        <Search size={navIconSize} className="text-gray-500 mt-1" />
        <input
          className="placeholder-gray-400 ml-2 flex-grow border-none bg-transparent px-4 py-2 text-base focus:outline-none"
          type="search"
          placeholder="Search for manufacturing resources..."
        />
        <button type="button" className="text-gray-500 bg-gray-200 ml-2 rounded-full p-2">
          <Sliders size={navIconSize} />
        </button>
      </div>
    </div>
  )
}

export default NavMenu
