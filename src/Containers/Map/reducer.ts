import produce from 'immer';

import mapConstans from './constants';

export const initialState = {
  places: [],
  channelStatus: 'off',
};

const mapReducer = (state = initialState, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case mapConstans.GET_PLACES_SUCCESS:
        console.log(action.payload)
        draft.places = action.payload;
        break;
      case mapConstans.CHANNEL_OFF:
        draft.channelStatus = 'off';
        break;
      case mapConstans.CHANNEL_ON:
        draft.channelStatus = 'on';
        break;
      default:
        break;
    }
  })
export default mapReducer;