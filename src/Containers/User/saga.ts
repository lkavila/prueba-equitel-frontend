import { takeLatest, put, call } from "redux-saga/effects";
import userActionsTypes from "./constants";
import axios from "axios";
import { loginSuccess, loading, registerFail, loginFail, success } from "./actions"


const URL_API = process.env.REACT_APP_URL_API;
const postRegister = (body: object) => {
  return axios
    .post(URL_API + '/users/register', { ...body })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

function* SignUpSaga(signUpAction: any): any {
  yield put(loading(true));
  const userData = {
    ...signUpAction.userData,
    passwordConfirmation: signUpAction.userData.password
  }
  const { response, error } = yield call(postRegister, userData);
  if (response) {
    console.log(response)
    yield put(success("User created successfully"));
  } else {
    console.log(error.response.data)
    yield put(registerFail(error.response.data.message));
  }

  yield put(loading(false));
}

const postLogin = (body: object) => {
  return axios
    .post(URL_API + 'users/login', { ...body })
    .then(response => ({ response }))
    .catch(error => ({ error }));
};

function* loginSaga(loginAction: any): any {
  yield put(loading(true));

  const { response, error } = yield call(postLogin, loginAction.userData);
  if (response) {
    yield put(loginSuccess(response.data.data));
    yield put(success(response.data.data.username));
  } else if (error.response) {
    yield put(loginFail(error.response.data.message));
  }

  yield put(loading(false));
}

export const userSagas = [
  takeLatest(userActionsTypes.LOGIN, loginSaga),
  takeLatest(userActionsTypes.REGISTER, SignUpSaga),
]