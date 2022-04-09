import { combineReducers } from 'redux';
import userReducer from "../containers/User/reducer"
import mapReducer from "../containers/Map/reducer"
import placeReducer from "../containers/Place/reducer"

const rootReducer = combineReducers({
    userReducer,
    mapReducer,
    placeReducer
});
export default rootReducer;