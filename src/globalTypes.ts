export interface UserType {
  name?: string;
  username: string;
  password?: string;
  active?: boolean;
  cretedAt?: string;
  updatedAt?: string;
  role?: string;
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
  user: UserType;
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