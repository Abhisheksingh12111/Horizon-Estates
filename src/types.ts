export type PropertyType = 'Apartment' | 'Villa' | 'Penthouse' | 'Commercial' | 'Plot';
export type TransactionType = 'Buy' | 'Rent';

export interface Property {
  id: string;
  title: string;
  tagline: string;
  location: string;
  city: string;
  state: string;
  price: number; // in Indian Rupees (₹)
  priceFormatted: string; // e.g. "₹3.85 Cr" or "₹95 Lakh"
  rentPeriod?: string; // e.g. "/ month"
  type: PropertyType;
  transaction: TransactionType;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  reraId: string;
  featured?: boolean;
  isNewLaunch?: boolean;
  readyToMove: boolean;
  possessionDate?: string;
  images: string[];
  description: string;
  amenities: string[];
  furnishingStatus: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  facing: 'East' | 'North-East' | 'North' | 'West';
  floorNumber?: string;
  totalFloors?: number;
  parkingSpots: number;
  agentId: string;
}

export interface Agent {
  id: string;
  name: string;
  designation: string;
  experienceYears: number;
  specialization: string;
  cities: string[];
  phone: string;
  email: string;
  image: string;
  languages: string[];
  reraRegNumber: string;
  bio: string;
  propertiesListedCount: number;
  rating: number;
  reviewsCount: number;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Feature {
  iconName: string;
  title: string;
  description: string;
}

export interface OfficeLocation {
  city: string;
  isHeadquarters?: boolean;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  reraNumber: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface FilterState {
  searchTerm: string;
  city: string;
  propertyType: string;
  transactionType: string;
  budgetRange: string;
  bedrooms: string;
  readyToMoveOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'area-desc';
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  propertyInterest: string;
  budgetRange: string;
  transactionType: TransactionType;
  message: string;
  preferredTime?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  quote: string;
  propertyPurchased: string;
  rating: number;
}
