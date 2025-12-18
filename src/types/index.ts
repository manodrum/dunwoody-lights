export interface LightDisplay {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  description?: string;
  imageUrl?: string;
  features?: string[];
}

export interface UserLocation {
  lat: number;
  lng: number;
}

export interface Route {
  displays: LightDisplay[];
  totalDistance?: number;
  estimatedTime?: number;
  origin?: UserLocation;
}
