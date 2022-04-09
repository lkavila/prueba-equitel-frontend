import produce from 'immer';
import { PlaceType } from '../../globalTypes';
import mapActionsTypes from './constants';

interface MapReducerActionsProps {
  type: string;
  payload: PlaceType[];
}
export const initialState = {
  places: [] as PlaceType[],
  channelStatus: 'off',
};

const mapReducer = (state = initialState, action: MapReducerActionsProps) =>
  produce(state, draft => {
    switch (action.type) {
      case mapActionsTypes.GET_PLACES_SUCCESS:
        draft.places = action.payload;
        break;
      case mapActionsTypes.CHANNEL_OFF:
        draft.channelStatus = 'off';
        break;
      case mapActionsTypes.CHANNEL_ON:
        draft.channelStatus = 'on';
        break;
      default:
        break;
    }
  })
export default mapReducer;