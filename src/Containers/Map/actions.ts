import { PlaceType } from '../../globalTypes';
import mapActionsTypes from './constants';

export const getPlaces = () => {
  return {
    type: mapActionsTypes.GET_PLACES,
  };
};

export const getPlacesSuccess = (payload: PlaceType[]) => {
  return {
    type: mapActionsTypes.GET_PLACES_SUCCESS,
    payload
  };
};

export const channelOff = () => {
  return {
    type: mapActionsTypes.CHANNEL_OFF,
  };
};

export const channelOn = () => {
  return {
    type: mapActionsTypes.CHANNEL_ON,
  };
};

export const stopChannel = () => {
  return {
    type: mapActionsTypes.STOP_CHANNEL,
  };
};

export const startChannel = () => {
  return {
    type: mapActionsTypes.START_CHANNEL,
  };
};