import { LatLngExpression } from 'leaflet'

import { Category } from './MarkerCategories'

export interface PlaceValues {
  id: number
  position: LatLngExpression
  category: Category
  title: string
  address: string
}

export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, PlaceValues[]>

export const Places: PlacesType = [
  {
    id: 1,
    position: [52.051977014580125, 8.531494086782844],
    category: Category.DIGITAL_FACTORIES,
    title: 'Digital Manufacturing Inc.',
    address: 'Industry Park 123, Tech City',
  },
  {
    id: 2,
    position: [52.02022592597971, 8.530780645829076],
    category: Category.DIGITAL_FACTORIES,
    title: '3D Print World',
    address: 'Innovation Street 56, Tech City',
  },
  {
    id: 3,
    position: [52.022468698328275, 8.50583167463131],
    category: Category.ROBOSMITHS,
    title: 'AssembleWorks',
    address: 'Assembly Line 789, Tech City',
  },
  {
    id: 4,
    position: [51.99739839338658, 8.59544834428681],
    category: Category.ROBOSMITHS,
    title: 'Mechanics Hub',
    address: 'Maker Space 101112, Tech City',
  },
  {
    id: 5,
    position: [52.01219274931668, 8.599568218099812],
    category: Category.TECHNO_FARMERS,
    title: 'TechStore Retail',
    address: 'Retail District 131415, Tech City',
  },
  {
    id: 6,
    position: [52.0119, 8.563032],
    category: Category.TECHNO_FARMERS,
    title: 'InnoShop Electronics',
    address: 'Downtown 161718, Tech City',
  },
  // ... Continue for other places
]
