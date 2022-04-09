import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { PlaceType } from '../../globalTypes';

const selectMapDomain = (state: { mapReducer: any }) => state.mapReducer || initialState;

const makeSelectPlaces = () =>
  createSelector(
    selectMapDomain,
    (substate: { places: PlaceType[]; }) => substate.places
  );

const makeSelectChannelStatus = () =>
  createSelector(
    selectMapDomain,
    (substate: { channelStatus: string; }) => substate.channelStatus
  );

export {
  makeSelectPlaces,
  makeSelectChannelStatus
}