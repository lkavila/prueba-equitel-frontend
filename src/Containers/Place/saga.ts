import { takeLatest, put, call, select, take, race, fork, delay, cancelled } from "redux-saga/effects";
import { eventChannel } from 'redux-saga';
import placeActionsTypes from "./constants";
import socketIOClient from "socket.io-client";
import {
  getPlacesTypesSuccess,
  createPlaceSuccess,
  getPlacesTypesFails,
  createReviewSuccess,
  getReviewsSuccess
} from "./actions"
import { loading, stopChannel } from "./actions";
import { PlaceType, ReviewType } from "../../globalTypes";
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

const createReview = (review: ReviewType, token: string) => {
  return new Promise(function (resolve, reject) {
    const socket = socketIOClient(API_DOMAIN, {
      withCredentials: true,
      extraHeaders: {
        "x-access-token": token
      }
    });

    if (review) {
      socket.emit('review:create', review);
      socket.on("emitted:review:create", (data: any) => {
        resolve(data);
      });

    } else {
      reject(new Error("No place data"));
    }
  });
}

function* createReviewSaga(createReviewAction: any): any {
  yield put(loading(true));
  const user = yield select(makeSelectUser());
  const response = yield call(createReview, createReviewAction.payload, user.token);

  if (!response.error) {
    yield put(createReviewSuccess(response.createdObject));
  } else {
    console.log(response.message);
  }
  yield put(loading(false));
}

let socket: any;
const connect = (token: string) => {
  socket = socketIOClient(API_DOMAIN, {
    withCredentials: true,
    extraHeaders: {
      "x-access-token": token
    }
  });
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const reconnect = (token: string) => {
  socket = socketIOClient(API_DOMAIN, {
    withCredentials: true,
    extraHeaders: {
      "x-access-token": token
    }
  });
  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};

const createSocketChannel = (socket: any, payload: any) => eventChannel((emit) => {
  const handler = (data: { error?: boolean, message: string, reviews: ReviewType[] }) => {
    // console.log(data);
    emit(data);
  };
  const pagination = {
    limit: 4,
    page: payload.page,
  }
  console.log("listening to getReviews event");
  socket.emit('review:list', payload.placeId, pagination);
  socket.on('emitted:review:list', handler);
  return () => {
    socket.off('emitted:review:list', handler);
  };
});

const listenConnectSaga = function* (token: string) {
  while (true) {
    yield call(reconnect, token);
  }
};

// Saga to switch on channel.
const listenServerSaga = function* (getReviewsAction: any): any {
  const user = yield select(makeSelectUser());
  const token = user.token;
  try {
    const { timeout } = yield race({
      connected: call(connect, token),
      timeout: delay(2000),
    });
    if (timeout) {
      yield put(stopChannel());
    }
    const socket = yield call(connect, token);
    const socketChannel = yield call(createSocketChannel, socket, getReviewsAction.payload);
    yield fork(listenConnectSaga, token);

    while (true) {
      const payload = yield take(socketChannel);
      yield put(getReviewsSuccess(payload.reviews));
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
    }
  }
};

// saga listens for start and stop actions
const startStopChannel = function* (getReviewsAction: any) {
  while (true) {
    yield race({
      task: call(listenServerSaga, getReviewsAction),
      cancel: take(placeActionsTypes.STOP_REVIEWS_CHANNEL),
    });
  }
};

export const placeSagas = [
  takeLatest(placeActionsTypes.GET_PLACES_TYPES, getPlacesTypesSaga),
  takeLatest(placeActionsTypes.START_REVIEWS_CHANNEL, startStopChannel),
  takeLatest(placeActionsTypes.CREATE_PLACE, createPlaceSaga),
  takeLatest(placeActionsTypes.CREATE_REVIEW, createReviewSaga),
]