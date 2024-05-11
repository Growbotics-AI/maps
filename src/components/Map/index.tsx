import { Map as LeafletMap } from 'leaflet'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import MapTopBar from '#components/TopBar'
import { fetchPlaces } from '#lib/api/placesApi'
import { AppConfig } from '#lib/AppConfig'
import MarkerCategories, { Category } from '#lib/MarkerCategories'
import { PlacesType } from '#lib/Places'

import LeafletMapContextProvider from './LeafletMapContextProvider'
import useMapContext from './useMapContext'
import useMarkerData from './useMarkerData'

const LeafletCluster = dynamic(async () => (await import('./LeafletCluster')).LeafletCluster(), {
  ssr: false,
})

const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, {
  ssr: false,
})

const CustomMarker = dynamic(async () => (await import('./LeafletMarker')).CustomMarker, {
  ssr: false,
})

const LocateButton = dynamic(async () => (await import('./ui/LocateButton')).LocateButton, {
  ssr: false,
})

const LeafletMapContainer = dynamic(async () => (await import('./LeafletMapContainer')).LeafletMapContainer, {
  ssr: false,
})

const LeafletMapInner = () => {
  const { map } = useMapContext()
  const [leafletMap, setLeafletMap] = useState<LeafletMap | undefined>(undefined)
  const [places, setPlaces] = useState<PlacesType>([])
  const { ref: viewportRef } = useResizeDetector()

  useEffect(() => {
    const fetchData = async () => {
      if (leafletMap) {
        const { lat, lng } = leafletMap.getCenter()
        const data = await fetchPlaces(lat, lng, 1000000)

        setPlaces(data)
      }
    }

    fetchData()
  }, [leafletMap])

  const { clustersByCategory, allMarkersBoundCenter } = useMarkerData({
    locations: places,
    map: leafletMap,
  })

  const isLoading = !leafletMap

  useEffect(() => {
    if (map) {
      setLeafletMap(map)
    }
  }, [map])

  useEffect(() => {
    if (!allMarkersBoundCenter || !leafletMap) return

    const moveEnd = () => {
      leafletMap.off('moveend', moveEnd)
    }

    leafletMap.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, {
      animate: false,
    })

    leafletMap.once('moveend', moveEnd)
  }, [allMarkersBoundCenter, leafletMap])

  return (
    <div className="relative h-full w-full" ref={viewportRef}>
      <MapTopBar map={leafletMap} />
      <div
        className={`absolute left-0 w-full transition-opacity ${isLoading ? 'opacity-0' : 'opacity-1'}`}
        style={{
          top: AppConfig.ui.topBarHeight, // Align map directly below the top bar
          height: `calc(100vh - ${AppConfig.ui.topBarHeight}px)`, // Set the map height relative to the top bar
        }}
      >
        {allMarkersBoundCenter && clustersByCategory && (
          <LeafletMapContainer
            center={allMarkersBoundCenter.centerPos}
            zoom={allMarkersBoundCenter.minZoom}
            maxZoom={AppConfig.maxZoom}
            minZoom={AppConfig.minZoom}
          >
            {isLoading ? (
              [] // Instead of `null`, pass an empty array
            ) : (
              <>
                <CenterToMarkerButton
                  center={allMarkersBoundCenter.centerPos}
                  zoom={allMarkersBoundCenter.minZoom}
                />
                <LocateButton />
                {Object.values(clustersByCategory).map(item => {
                  const markerCategory = MarkerCategories[item.category as Category]
                  if (markerCategory) {
                    return (
                      <LeafletCluster
                        key={item.category}
                        icon={markerCategory.icon}
                        color={markerCategory.color}
                        chunkedLoading
                      >
                        {item.markers.map(marker => (
                          <CustomMarker place={marker} key={marker.id} />
                        ))}
                      </LeafletCluster>
                    )
                  }
                  return null
                })}
              </>
            )}
          </LeafletMapContainer>
        )}
      </div>
    </div>
  )
}

const Map = () => (
  <LeafletMapContextProvider>
    <LeafletMapInner />
  </LeafletMapContextProvider>
)

export default Map
