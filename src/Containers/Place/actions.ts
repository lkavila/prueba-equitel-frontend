import placeActionsTypes from './constants';
import { PlaceType, PlaceTypesType } from '../../globalTypes';

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