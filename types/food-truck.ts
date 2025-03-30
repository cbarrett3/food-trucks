export interface FoodTruck {
  id: string
  name: string
  description: string
  image: string
  logo: string
  menuImage?: string
  interiorImage?: string
  rating: number
  reviewCount: number
  distance: number
  location: string
  coordinates: {
    latitude: number
    longitude: number
  }
  tags: string[]
  phone: string
  website: string
  instagram: string
  twitter: string
  priceRange: string
  isOpen: boolean
  isPopular: boolean
  specialOffer: string | null
  menuItems: {
    name: string
    price: number
    description: string
    image?: string
  }[]
  reviews: {
    id: string
    userName: string
    userImage: string
    rating: number
    date: string
    text: string
  }[]
}
