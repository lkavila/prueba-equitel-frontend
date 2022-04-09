export interface UserType {
  name?: string;
  username: string;
  password?: string;
}

export interface PlaceTypesType {
  _id?: string;
  name: string;
}

export interface ReviewType {
  _id?: string;
  placeId?: string;
  user: {
    _id: string;
    username: string;
  }
  comment?: string;
  rating: number;
  createdAt?: Date;
}
export interface PlaceType {
  _id?: string;
  name: string;
  description?: string;
  userId?: string;
  typeName?: string;
  type?: PlaceTypesType;
  location: {
    type: string;
    coordinates: [
      number,
      number,
    ];
  };
  createdAt?: Date;
  updatedAt?: Date;
  averageRating?: number;
  dist?: {
    calculated: number;
  },
  reviews?: []
}