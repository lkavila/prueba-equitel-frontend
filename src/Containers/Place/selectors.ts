import { createSelector } from "reselect";
import initialState from "./reducer";
import { PlaceType, PlaceTypesType } from "../../globalTypes";


const placeDomain = (state: { placeReducer: any }) => state.placeReducer || initialState;

export const makeSelectPlace = () =>
  createSelector(
    placeDomain,
    (substate: { place: PlaceType; }) => substate.place
  );

export const makeSelectLoading = () =>
  createSelector(
    placeDomain,
    (substate: { loading: boolean; }) => substate.loading
  );

export const makeSelectError = () =>
  createSelector(
    placeDomain,
    (substate: { error: string }) => substate.error
  );

export const makeSelectPlacesTypes = () =>
  createSelector(
    placeDomain,
    (substate: { placesTypes: PlaceTypesType[] }) => substate.placesTypes
  );