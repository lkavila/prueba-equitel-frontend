import { takeLatest, call, put, select, fork, delay, take, race, cancelled } from 'redux-saga/effects';
import { makeSelectUser } from '../User/selectors';
import mapActionsTypes from './constants';
import { getPlacesSuccess, channelOff, channelOn, stopChannel } from './actions';
import socketIOClient from "socket.io-client";
import { eventChannel } from 'redux-saga';
import { PlaceType } from '../../globalTypes';

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN || '';

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

const createSocketChannel = (socket: any) => eventChannel((emit) => {
  const handler = (data: { error?: boolean, message: string, places: PlaceType[] }) => {
    console.log(data);
    emit(data);
  };
  const filter = {
    maxDistance: 1000,
    limit: 10,
    page: 1,
  }
  console.log("listening to getPlaces event");
  socket.emit('places:getPlaces', filter);
  socket.on('emitted:places:getPlaces', handler);
  return () => {
    socket.off('emitted:places:getPlaces', handler);
  };
});

// connection monitoring sagas

const listenConnectSaga = function* (token: string) {
  while (true) {
    yield call(reconnect, token);
  }
};

// Saga to switch on channel.
const listenServerSaga = function* (): any {
  const user = yield select(makeSelectUser());
  const token = user.token;
  try {
    yield put(channelOn());
    const { timeout } = yield race({
      connected: call(connect, token),
      timeout: delay(2000),
    });
    if (timeout) {
      yield put(stopChannel());
    }
    console.log("Connecting");
    const socket = yield call(connect, token);
    const socketChannel = yield call(createSocketChannel, socket);
    yield fork(listenConnectSaga, token);

    while (true) {
      const payload = yield take(socketChannel);
      console.log("recive emitted places list");
      yield put(getPlacesSuccess(payload.places));
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put(channelOff());
    }
  }
};

// saga listens for start and stop actions
const startStopChannel = function* () {
  while (true) {
    yield race({
      task: call(listenServerSaga),
      cancel: take(mapActionsTypes.STOP_CHANNEL),
    });
  }
};
export const mapSagas = [
  takeLatest(mapActionsTypes.START_CHANNEL, startStopChannel),
];