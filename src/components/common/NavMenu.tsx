import { Map } from 'leaflet'
import { Search, Sliders } from 'lucide-react'
import nominatim, { SearchResultItem } from 'nominatim-client'
import { useEffect, useState } from 'react'

import { AppConfig, NavMenuVariant } from '#lib/AppConfig'

interface NavMenuProps {
  variant?: NavMenuVariant
  map: Map | undefined
}

const NavMenu = ({ variant = NavMenuVariant.TOPNAV, map }: NavMenuProps) => {
  const navIconSize = AppConfig.ui.topBarIconSize
  const [L, setL] = useState<typeof import('leaflet') | null>(null)
  const [searchResult, setSearchResult] = useState<SearchResultItem[] | null>(null)

  useEffect(() => {
    import('leaflet').then(leaflet => {
      setL(leaflet)
    })
  }, [])

  useEffect(() => {
    if (searchResult && searchResult.length > 0) {
      const { lat, lon } = searchResult[0]

      if (lat && lon && L && map) {
        const latLng = L.latLng(parseFloat(lat), parseFloat(lon))
        map.setView(latLng, 13)
      }
    }
  }, [searchResult, L, map])

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const searchTerm = event.currentTarget.elements.namedItem('search') as HTMLInputElement

    try {
      const client = nominatim.createClient({
        useragent: 'Growbotics AI Map',
        referer: 'https://maps.growbotics.ai/',
      })

      const query = {
        q: searchTerm.value,
        addressdetails: 1 as const,
        limit: 1,
      }

      const result = await client.search(query)
      setSearchResult(result)
    } catch (error) {
      // Handle the error or log it using an appropriate logging mechanism
      // Example: log the error to a server-side logging service or display an error message to the user
    }
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
        />
        <button type="submit" className="text-gray-500 bg-gray-200 ml-2 rounded-full p-2">
          <Sliders size={navIconSize} />
        </button>
      </form>
    </div>
  )
}

export default NavMenu
