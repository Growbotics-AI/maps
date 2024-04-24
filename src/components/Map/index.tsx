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

  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 200,
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlaces()
      // Log the fetched places data for debugging purposes
      // console.log('Fetched places data:', data)
      setPlaces(data)
    }

    fetchData()
  }, [])

  const { clustersByCategory, allMarkersBoundCenter } = useMarkerData({
    locations: places,
    map: leafletMap,
    viewportWidth,
    viewportHeight,
  })

  // Log the clustersByCategory and allMarkersBoundCenter for debugging purposes
  // console.log('clustersByCategory:', clustersByCategory)
  // console.log('allMarkersBoundCenter:', allMarkersBoundCenter)

  const isLoading = !leafletMap || !viewportWidth || !viewportHeight

  useEffect(() => {
    if (map) {
      setLeafletMap(map)
    }
  }, [map])

  /** watch position & zoom of all markers */
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
    <div className="absolute h-full w-full overflow-hidden" ref={viewportRef}>
      <MapTopBar map={leafletMap} />
      <div
        className={`absolute left-0 w-full transition-opacity ${isLoading ? 'opacity-0' : 'opacity-1 '}`}
        style={{
          top: AppConfig.ui.topBarHeight,
          width: viewportWidth ?? '100%',
          height: viewportHeight ? viewportHeight - AppConfig.ui.topBarHeight : '100%',
        }}
      >
        {allMarkersBoundCenter && clustersByCategory && (
          <LeafletMapContainer
            center={allMarkersBoundCenter.centerPos}
            zoom={allMarkersBoundCenter.minZoom}
            maxZoom={AppConfig.maxZoom}
            minZoom={AppConfig.minZoom}
          >
            {!isLoading ? (
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
            ) : (
              // we have to spawn at least one element to keep it happy
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            )}
          </LeafletMapContainer>
        )}
      </div>
    </div>
  )
}

// pass through to get context in <MapInner>
const Map = () => (
  <LeafletMapContextProvider>
    <LeafletMapInner />
  </LeafletMapContextProvider>
)

export default Map
