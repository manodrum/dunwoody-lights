export interface LightDisplay {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  description?: string;
  rating?: number;
  imageUrl?: string;
  features?: string[];
}

export interface Route {
  displays: LightDisplay[];
  totalDistance?: number;
  estimatedTime?: number;
}
