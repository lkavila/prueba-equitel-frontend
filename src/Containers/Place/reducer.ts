import { PlaceType, PlaceTypesType, ReviewType } from "../../globalTypes"
import placeActions from "./constants"
import produce from "immer"

interface PlacesReducerActionsProps {
  type: string,
  payload: any | PlaceType | PlaceTypesType[]
}
const initialState = {
  place: {} as PlaceType,
  placesTypes: [] as PlaceTypesType[],
  reviews: [] as ReviewType[],
  loading: false,
  error: '',
}

const placeReducer = (state = initialState, action: PlacesReducerActionsProps) => {
  return produce(state, draft => {
    switch (action.type) {
      case placeActions.CREATE_PLACE_SUCCESS:
        draft.error = '';
        draft.place = action.payload
        break;
      case placeActions.GET_PLACES_TYPES_SUCCESS:
        draft.error = '';
        draft.placesTypes = action.payload
        break;
      case placeActions.CREATE_PLACE_FAIL:
        draft.error = action.payload
        break;
      case placeActions.GET_PLACES_TYPES_FAIL:
        draft.error = action.payload
        break;
      case placeActions.GET_REVIEWS_SUCCESS:
        draft.error = '';
        draft.reviews = action.payload
        break;
      case placeActions.CREATE_REVIEW_SUCCESS:
        draft.error = '';
        break;
      case placeActions.LOADING:
        draft.loading = action.payload
        break;
    }

  });
}

export default placeReducer;