import { takeLatest, put, call, select } from "redux-saga/effects";
import placeActionsTypes from "./constants";
import socketIOClient from "socket.io-client";
import { getPlacesTypesSuccess, createPlaceSuccess, getPlacesTypesFails } from "./actions"
import { loading } from "./actions";
import { PlaceType } from "../../globalTypes";
import { makeSelectUser } from "../User/selectors";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN || "";

const getPlacesTypes = (token: string) => {
  return new Promise((resolve, reject) => {
    const socket = socketIOClient(API_DOMAIN, {
      withCredentials: true,
      extraHeaders: {
        "x-access-token": token,
      }
    });
    socket.emit("placesTypes:list");
    socket.on("emitted:placesTypes:list", (data: any) => {
      resolve(data);
    });
  });

}

function* getPlacesTypesSaga(): any {
  yield put(loading(true));
  const user = yield select(makeSelectUser());
  try {
    const response = yield call(getPlacesTypes, user.token);
    if (response.error) {
      yield put(getPlacesTypesFails(response.message));
    } else {
      yield put(getPlacesTypesSuccess(response.placesTypes));
    }
  } catch (error) {
    console.log(error);
    yield put(getPlacesTypesFails("Error trying to get places types"));
  } finally {
    yield put(loading(false));
  }
}

const createPlace = (place: PlaceType, token: string) => {
  return new Promise(function (resolve, reject) {
    const socket = socketIOClient(API_DOMAIN, {
      withCredentials: true,
      extraHeaders: {
        "x-access-token": token
      }
    });

    if (place) {
      socket.emit('places:create', place);
    } else {
      reject(new Error("No place data"));
    }
  });
};

function* createPlaceSaga(createPlaceAction: any): any {
  yield put(loading(true));
  const user = yield select(makeSelectUser());
  const response = yield call(createPlace, createPlaceAction.payload, user.token);
  console.log(response);
  if (!response.error) {
    yield put(createPlaceSuccess(response.createdObject));
  } else {
    console.log(response.message);
  }
  yield put(loading(false));
}


export const placeSagas = [
  takeLatest(placeActionsTypes.GET_PLACES_TYPES, getPlacesTypesSaga),
  takeLatest(placeActionsTypes.CREATE_PLACE, createPlaceSaga),
]