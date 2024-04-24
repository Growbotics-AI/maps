import { PlacesType } from '#lib/Places'

export const fetchPlaces = async (): Promise<PlacesType> => {
  const response = await fetch(`/api/places`)
  const data = await response.json()
  return data as PlacesType
}
