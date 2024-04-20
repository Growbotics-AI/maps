import { LocateFixed, LucideProps } from 'lucide-react'
import { FunctionComponent } from 'react'

import LocalBusinessIcon from '../components/icons/LocalBusinessIcon'
import RobosmithIcon from '../components/icons/RobosmithIcon'
import ThreeDPrinterIcon from '../components/icons/ThreeDPrinterIcon'

export enum Category {
  LOCATE = 0,
  DIGITAL_FACTORIES = 1,
  ROBOSMITHS = 2,
  TECHNO_FARMERS = 3,
}

export interface MarkerCategoriesValues {
  name: string
  icon: FunctionComponent<LucideProps> | FunctionComponent
  color: string
  iconColor?: string
  hideInMenu?: boolean
}

type MarkerCategoryType = { [key in Category]: MarkerCategoriesValues }

const MarkerCategories: MarkerCategoryType = {
  [Category.LOCATE]: {
    name: 'User Location',
    icon: LocateFixed,
    color: '#8A2BE2', // Blue-violet color for good contrast with white icon, distinct for color blindness
    hideInMenu: false,
  },
  [Category.DIGITAL_FACTORIES]: {
    name: 'Digital Factories',
    icon: ThreeDPrinterIcon, // Assuming you want to keep the 3D printer icon for Digital Factories
    color: '#00A8E8', // Light blue color for good contrast with white icon
    hideInMenu: false,
  },
  [Category.ROBOSMITHS]: {
    name: 'Robosmiths',
    icon: RobosmithIcon, // Assuming you will have a specific icon for Robosmiths
    color: '#007F5F', // Dark teal color for good contrast with white icon
  },
  [Category.TECHNO_FARMERS]: {
    name: 'Techno Farmers',
    icon: LocalBusinessIcon, // Placeholder, change to a specific icon representing Techno Farmers
    color: '#FF6B6B', // Light red color for good contrast with white icon
  },
}

export default MarkerCategories
