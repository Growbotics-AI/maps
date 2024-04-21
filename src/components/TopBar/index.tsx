import { Map } from 'leaflet'

import { NavMenuVariant } from '#lib/AppConfig'

import NavMenu from '../common/NavMenu'

interface MapTopBarProps {
  map: Map | undefined
}

const MapTopBar = ({ map }: MapTopBarProps) => (
  <div
    className="absolute left-0 top-0 flex h-20 w-full items-center p-3 shadow"
    style={{ backgroundColor: '#1F2937', zIndex: 1000 }}
  >
    <div className="flex w-full items-center justify-between">
      {/* <LatLngLogo /> */}
      <NavMenu variant={NavMenuVariant.TOPNAV} map={map} />
      {/* If you have more items on the right side, you can add them here */}
    </div>
  </div>
)

export default MapTopBar
