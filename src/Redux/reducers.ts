import { combineReducers } from 'redux';
import userReducer from "../Containers/User/reducer"
import mapReducer from "../Containers/Map/reducer"
import placeReducer from "../Containers/Place/reducer"

const rootReducer = combineReducers({
    userReducer,
    mapReducer,
    placeReducer
});
export default rootReducer;