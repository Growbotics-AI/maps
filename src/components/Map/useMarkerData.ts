import { LatLngExpression, Map } from 'leaflet'
import IPinfoWrapper from 'node-ipinfo'
import { useEffect, useMemo, useState } from 'react'

import useMapContext from '#components/Map/useMapContext'
import { AppConfig } from '#lib/AppConfig'
import { Category } from '#lib/MarkerCategories'
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
    if (!locations || !leafletLib || locations.length === 0) return undefined

    const coordsSum: LatLngExpression[] = []
    locations.forEach(item => {
      coordsSum.push(item.position)
    })

    return leafletLib.latLngBounds(coordsSum)
  }, [leafletLib, locations])

  const clustersByCategory = useMemo(() => {
    if (!locations) return undefined

    const categoryMapping: Record<string, Category> = {
      DIGITAL_FACTORIES: Category.DIGITAL_FACTORIES,
      ROBOSMITHS: Category.ROBOSMITHS,
      TECHNO_FARMERS: Category.TECHNO_FARMERS,
    }

    const groupedLocations = locations.reduce<PlacesClusterType>((acc, location) => {
      const { category } = location
      const mappedCategory = categoryMapping[category]
      if (mappedCategory !== undefined) {
        if (!acc[mappedCategory]) {
          acc[mappedCategory] = []
        }
        acc[mappedCategory].push(location)
      }
      return acc
    }, {})

    const mappedClusters = Object.entries(groupedLocations).map(([key, markers]) => ({
      category: key as Category,
      markers,
    }))

    // Log the grouped locations and mapped clusters for debugging purposes
    // console.log('Grouped locations:', groupedLocations)
    // console.log('Mapped clusters:', mappedClusters)

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

    const minZoom = map.getBoundsZoom(allMarkerBounds)
    const centerPos: LatLngExpression = [allMarkerBounds.getCenter().lat, allMarkerBounds.getCenter().lng]

    // Log the min zoom and center position for debugging purposes
    // console.log('Min zoom:', minZoom)
    // console.log('Center position:', centerPos)

    setAllMarkersBoundCenter({
      minZoom,
      centerPos,
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
