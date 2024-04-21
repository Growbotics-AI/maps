import { Map } from 'leaflet'
import { createContext, useState } from 'react'

interface MapContextValues {
  map: Map | undefined
  setMap: (e: Map | undefined) => void
  leafletLib: typeof import('leaflet') | undefined
  setLeafletLib: (e: typeof import('leaflet') | undefined) => void
}

export const MapContext = createContext<MapContextValues | undefined>(undefined)

interface MapContextProviderProps {
  children: React.ReactNode
}

const LeafletMapContextProvider = ({ children }: MapContextProviderProps) => {
  const [map, setMap] = useState<Map | undefined>(undefined)
  const [leafletLib, setLeafletLib] = useState<typeof import('leaflet') | undefined>(undefined)

  return (
    <MapContext.Provider value={{ map, setMap, leafletLib, setLeafletLib }}>{children}</MapContext.Provider>
  )
}

export default LeafletMapContextProvider
