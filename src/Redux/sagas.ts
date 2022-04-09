import { all } from 'redux-saga/effects';
import { userSagas } from "../Containers/User/saga"
import { mapSagas } from '../Containers/Map/saga';
import { placeSagas } from '../Containers/Place/saga';

const superSagas = [...userSagas, ...placeSagas, ...mapSagas];

export default function* rootSaga() {
    yield all([...superSagas]);
};