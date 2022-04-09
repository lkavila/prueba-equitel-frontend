import userActionsTypes from './constants';
import { UserType } from '../../globalTypes';

export const change = (target: object) => {
  return {
    type: userActionsTypes.CHANGE,
    payload: { target }
  };
};

export const register = (userData: UserType) => {
  return {
    type: userActionsTypes.REGISTER,
    userData
  };
};

export const login = (userData: UserType) => {
  return {
    type: userActionsTypes.LOGIN,
    userData
  };
};

export const loginSuccess = (userData: UserType) => {
  return {
    type: userActionsTypes.LOGIN_SUCCESS,
    payload: userData
  };
};

export const loading = (target: boolean) => {
  return {
    type: userActionsTypes.LOADING,
    payload: target
  };
};

export const error = (target: string) => {
  return {
    type: userActionsTypes.ERROR,
    payload: target
  };
};

export const success = (target: string) => {
  return {
    type: userActionsTypes.SUCCESS,
    payload: target
  };
};

export const registerFail = (target: string) => {
  return {
    type: userActionsTypes.REGISTER_FAIL,
    payload: target
  };
};

export const loginFail = (target: string) => {
  return {
    type: userActionsTypes.LOGIN_FAIL,
    payload: target
  };
};