export type Apartment = {
  id: number;
  name: string;
  status: number;
  countryFullName: string;
  city: string;
  mainPhotoUrl: string;
  ratePerHour: number;
  currency: number;
  lat: number;
  lon: number;
  maxParticipants: number;
  ratingAvg?: any;
  distance: number;
  selected: boolean;
};

export type CollectionData = {
  selectedItem: Apartment | null;
  list: Apartment[];
};
