import { LocateFixed, LucideProps } from 'lucide-react'
import { FunctionComponent } from 'react'

import LocalBusinessIcon from '../components/icons/LocalBusinessIcon'
import RobosmithIcon from '../components/icons/RobosmithIcon'
import ThreeDPrinterIcon from '../components/icons/ThreeDPrinterIcon'

export enum Category {
  LOCATE = 'LOCATE',
  DIGITAL_FACTORIES = 'DIGITAL_FACTORIES',
  ROBOSMITHS = 'ROBOSMITHS',
  TECHNO_FARMERS = 'TECHNO_FARMERS',
}

export interface MarkerCategoriesValues {
  name: string
  icon: FunctionComponent<LucideProps> | FunctionComponent
  color: string
  iconColor?: string
  hideInMenu?: boolean
}

type MarkerCategoryType = {
  [key in Category]: MarkerCategoriesValues
}

const MarkerCategories: MarkerCategoryType = {
  [Category.LOCATE]: {
    name: 'User Location',
    icon: LocateFixed,
    color: '#8A2BE2',
    hideInMenu: false,
  },
  [Category.DIGITAL_FACTORIES]: {
    name: 'Digital Factories',
    icon: ThreeDPrinterIcon,
    color: '#00A8E8',
    hideInMenu: false,
  },
  [Category.ROBOSMITHS]: {
    name: 'Robosmiths',
    icon: RobosmithIcon,
    color: '#007F5F',
  },
  [Category.TECHNO_FARMERS]: {
    name: 'Techno Farmers',
    icon: LocalBusinessIcon,
    color: '#FF6B6B',
  },
}

export default MarkerCategories
