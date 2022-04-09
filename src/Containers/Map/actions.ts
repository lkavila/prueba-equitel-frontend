import mapConstans from './constants';

export const getPlaces = () => {
  return {
    type: mapConstans.GET_PLACES,
  };
};

export const getPlacesSuccess = (payload: any) => {
  return {
    type: mapConstans.GET_PLACES_SUCCESS,
    payload
  };
};

export const channelOff = () => {
  return {
    type: mapConstans.CHANNEL_OFF,
  };
};

export const channelOn = () => {
  return {
    type: mapConstans.CHANNEL_ON,
  };
};

export const stopChannel = () => {
  return {
    type: mapConstans.STOP_CHANNEL,
  };
};

export const startChannel = () => {
  return {
    type: mapConstans.START_CHANNEL,
  };
};