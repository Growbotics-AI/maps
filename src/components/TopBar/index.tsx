import { Map } from 'leaflet'
import { FC } from 'react'

import { NavMenuVariant } from '#lib/AppConfig'

import NavMenu from '../common/NavMenu'

interface TopBarProps {
  variant?: NavMenuVariant
  map?: Map // Replaced any with the leaflet Map type
}

const TopBar: FC<TopBarProps> = ({ variant = NavMenuVariant.TOPNAV, map }) => (
  <header
    className="flex h-20 w-full items-center p-3 shadow"
    style={{ backgroundColor: '#1F2937', zIndex: 1000 }}
  >
    <div className="flex w-full items-center justify-between">
      {/* Add your logo or other elements here */}
      <NavMenu variant={variant} map={map} />
      {/* Add other right-aligned elements as needed */}
    </div>
  </header>
)

export default TopBar
