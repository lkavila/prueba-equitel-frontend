export interface UserType {
  name?: string;
  username: string;
  password: string;
}

export interface PlaceTypesType {
  _id?: string;
  name: string;
}

export interface PlaceType {
  name: string;
  description?: string;
  userId: string;
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