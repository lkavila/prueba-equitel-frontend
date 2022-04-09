import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { UserType } from '../../globalTypes';


const selectUserDomain = (state: { userReducer: any; }) => state.userReducer || initialState;

const makeSelectUser = () =>
  createSelector(
    selectUserDomain,
    (substate: { user: UserType; }) => substate.user
  );

const makeSelectLoading = () =>
  createSelector(
    selectUserDomain,
    (substate: { loading: boolean; }) => substate.loading
  );

const makeSelectError = () =>
  createSelector(
    selectUserDomain,
    (substate: { error: string; }) => substate.error
  );

const makeSelectSuccess = () =>
  createSelector(
    selectUserDomain,
    (substate: { success: string; }) => substate.success
  );

const makeSelectLoginFail = () =>
  createSelector(
    selectUserDomain,
    (substate: { loginFail: string; }) => substate.loginFail
  );

const makeSelectRegisterFail = () =>
  createSelector(
    selectUserDomain,
    (substate: { registerFail: string; }) => substate.registerFail
  );
export {
  makeSelectUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectLoginFail,
  makeSelectRegisterFail,
  makeSelectSuccess
};