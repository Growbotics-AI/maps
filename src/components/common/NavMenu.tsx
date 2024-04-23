import { Map } from 'leaflet'
import { Search, Sliders } from 'lucide-react'
import { useEffect, useState } from 'react'

import { AppConfig, NavMenuVariant } from '#lib/AppConfig'

interface NavMenuProps {
  variant?: NavMenuVariant
  map: Map | undefined
}

const NavMenu = ({ variant = NavMenuVariant.TOPNAV, map }: NavMenuProps) => {
  const navIconSize = AppConfig.ui.topBarIconSize
  const [L, setL] = useState<typeof import('leaflet') | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    import('leaflet').then(leaflet => {
      setL(leaflet)
    })
  }, [])

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/nominatim?q=${encodeURIComponent(searchTerm)}`)
      const result = await response.json()
      if (result.length > 0) {
        const { lat, lon } = result[0]
        if (lat && lon && L && map) {
          const latLng = L.latLng(parseFloat(lat), parseFloat(lon))
          map.setView(latLng, 13)
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during search:', error)
      // eslint-disable-next-line no-alert
      alert('An error occurred while searching. Please check the console for more details.')
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // Determine the appropriate CSS classes based on the variant
  const menuClasses =
    variant === NavMenuVariant.TOPNAV
      ? 'flex items-center w-full max-w-3xl px-3 py-2 bg-white shadow-sm rounded-md'
      : 'flex flex-col items-start'

  return (
    <div className="flex w-full items-center justify-center">
      <form className={menuClasses} onSubmit={handleSearch}>
        <Search size={navIconSize} className="text-gray-500 mt-1" />
        <input
          name="search"
          className="placeholder-gray-400 ml-2 flex-grow border-none bg-transparent px-4 py-2 text-base focus:outline-none"
          type="search"
          placeholder="Search for locations..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit" className="text-gray-500 bg-gray-200 ml-2 rounded-full p-2">
          <Sliders size={navIconSize} />
        </button>
      </form>
    </div>
  )
}

export default NavMenu
