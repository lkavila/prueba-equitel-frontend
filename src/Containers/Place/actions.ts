import placeActionsTypes from './constants';
import { PlaceType, PlaceTypesType, ReviewType } from '../../globalTypes';

export const createPlace = (payload: PlaceType) => ({ //This action will be used only in the saga
  type: placeActionsTypes.CREATE_PLACE,
  payload,
});

export const createPlaceSuccess = (payload: PlaceType) => ({
  type: placeActionsTypes.CREATE_PLACE_SUCCESS,
  payload,
});

export const createPlaceFail = (payload: any) => ({
  type: placeActionsTypes.CREATE_PLACE_FAIL,
  payload,
});

export const getPlacesTypes = () => ({ //This action will be used only in the saga
  type: placeActionsTypes.GET_PLACES_TYPES,
});

export const getPlacesTypesSuccess = (payload: PlaceTypesType[]) => ({
  type: placeActionsTypes.GET_PLACES_TYPES_SUCCESS,
  payload,
});

export const getPlacesTypesFails = (payload: any) => ({
  type: placeActionsTypes.GET_PLACES_TYPES_FAIL,
  payload,
});

export const loading = (payload: boolean) => ({
  type: placeActionsTypes.LOADING,
  payload,
});

export const updatePlace = (payload: PlaceType) => ({ //This action will be used only in the saga
  type: placeActionsTypes.UPDATE_PLACE,
  payload,
});

export const updatePlaceSuccess = (payload: PlaceType) => ({
  type: placeActionsTypes.UPDATE_PLACE_SUCCESS,
  payload,
});

export const getReviewsSuccess = (payload: ReviewType[]) => ({
  type: placeActionsTypes.GET_REVIEWS_SUCCESS,
  payload,
});

export const createReview = (payload: ReviewType) => ({ //This action will be used only in the saga
  type: placeActionsTypes.CREATE_REVIEW,
  payload,
});

export const createReviewSuccess = (payload: ReviewType) => ({
  type: placeActionsTypes.CREATE_REVIEW_SUCCESS,
  payload,
});

export const stopChannel = () => ({//This action will be used only in the saga
  type: placeActionsTypes.STOP_REVIEWS_CHANNEL
});


export const startChannel = (placeId: string, page: number) => ({//This action will be used only in the saga to get reviews in realtime
  type: placeActionsTypes.START_REVIEWS_CHANNEL,
  payload: { placeId, page }
});