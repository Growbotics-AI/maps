import { PlacesType } from '#lib/Places'

export const fetchPlaces = async (lat: number, lng: number, radius: number): Promise<PlacesType> => {
  // Construct the query parameters string
  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    radius: radius.toString(),
  })

  // Use the constructed query parameters in the fetch URL
  const response = await fetch(`/api/places?${params.toString()}`)
  const data = await response.json()
  return data as PlacesType
}
