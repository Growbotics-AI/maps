import { LatLngExpression, Map } from 'leaflet'
import IPinfoWrapper from 'node-ipinfo'
import { useEffect, useMemo, useState } from 'react'

import useMapContext from '#components/Map/useMapContext'
import { AppConfig } from '#lib/AppConfig'
import { PlacesClusterType, PlacesType } from '#lib/Places'

interface useMapDataValues {
  locations?: PlacesType
  map?: Map
  viewportWidth?: number
  viewportHeight?: number
}

interface allMarkerPosValues {
  minZoom: number
  centerPos: LatLngExpression
}

const useMarkerData = ({ locations, map, viewportWidth, viewportHeight }: useMapDataValues) => {
  const [allMarkersBoundCenter, setAllMarkersBoundCenter] = useState<allMarkerPosValues>({
    minZoom: AppConfig.minZoom - 5,
    centerPos: AppConfig.baseCenter,
  })

  const { leafletLib } = useMapContext()

  // get bounds of all markers
  const allMarkerBounds = useMemo(() => {
    if (!locations || !leafletLib) return undefined

    const coordsSum: LatLngExpression[] = []
    locations.forEach(item => {
      coordsSum.push(item.position)
    })

    return leafletLib.latLngBounds(coordsSum)
  }, [leafletLib, locations])

  const clustersByCategory = useMemo(() => {
    if (!locations) return undefined

    const groupedLocations = locations.reduce<PlacesClusterType>((acc, location) => {
      const { category } = location
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(location)
      return acc
    }, {})

    const mappedClusters = Object.keys(groupedLocations).map(key => ({
      category: Number(key),
      markers: groupedLocations[key],
    }))

    return mappedClusters
  }, [locations])

  // Fetch user's location based on IP address
  useEffect(() => {
    const fetchUserLocation = async () => {
      const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN
      if (!token) {
        // Handle the error or log it using an appropriate logging mechanism
        return
      }

      const ipinfoWrapper = new IPinfoWrapper(token)
      try {
        const response = await ipinfoWrapper.lookupIp('')
        const { loc } = response
        if (loc) {
          const [latitude, longitude] = loc.split(',').map(parseFloat)
          setAllMarkersBoundCenter(prevState => ({
            ...prevState,
            centerPos: [latitude, longitude] as LatLngExpression,
          }))
        }
      } catch (error) {
        // Handle the error or log it using an appropriate logging mechanism
      }
    }

    fetchUserLocation()
  }, [])

  // auto resize map to fit all markers on viewport change
  // it's crucial to set viewport size as dependency to trigger the map resize
  useEffect(() => {
    if (!allMarkerBounds || !map) return
    if (!viewportWidth || !viewportHeight) return

    map.invalidateSize()
    setAllMarkersBoundCenter({
      minZoom: map.getBoundsZoom(allMarkerBounds),
      centerPos: [allMarkerBounds.getCenter().lat, allMarkerBounds.getCenter().lng],
    })
  }, [allMarkerBounds, map, viewportWidth, viewportHeight])

  const updateMapCenter = (lat: number, lon: number, zoom = 13) => {
    if (map && leafletLib) {
      const latLng = leafletLib.latLng(lat, lon)
      map.setView(latLng, zoom)
    }
  }

  return { clustersByCategory, allMarkersBoundCenter, updateMapCenter }
}

export default useMarkerData
