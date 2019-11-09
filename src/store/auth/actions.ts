import { ThunkAction } from "redux-thunk";
import { authService, IUserData } from "../../services/auth";
import {
  AuthActionTypes,
  RECEIVE_USER_DATA,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_REGISTRATION,
  IAuthState,
  RECEIVE_AUTH_ERROR
} from "./types";

type AuthThunkAction = ThunkAction<
  Promise<AuthActionTypes>,
  IAuthState,
  undefined,
  AuthActionTypes
>;

export const requestLogin = (
  email: string,
  password: string
): AuthActionTypes => ({
  type: REQUEST_LOGIN,
  payload: {
    email,
    password
  }
});

export const receiveUserData = (
  jwt: string,
  user: IUserData
): AuthActionTypes => ({
  type: RECEIVE_USER_DATA,
  payload: {
    jwt,
    user
  }
});

export const receiveAuthError = (error: string): AuthActionTypes => ({
  type: RECEIVE_AUTH_ERROR,
  payload: {
    error
  }
});

export const requestRegistration = (
  username: string,
  email: string,
  password: string
): AuthActionTypes => ({
  type: REQUEST_REGISTRATION,
  payload: {
    username,
    email,
    password
  }
});

export const register = (
  username: string,
  email: string,
  password: string
): AuthThunkAction => async dispatch => {
  dispatch(requestRegistration(username, email, password));

  try {
    const { jwt, user } = await authService.register(username, email, password);
    return dispatch(receiveUserData(jwt, user));
  } catch (error) {
    const { message } = error as Error;
    return dispatch(receiveAuthError(message));
  }
};

export const login = (
  email: string,
  password: string
): AuthThunkAction => async dispatch => {
  dispatch(requestLogin(email, password));

  try {
    const { jwt, user } = await authService.login(email, password);
    return dispatch(receiveUserData(jwt, user));
  } catch (error) {
    const { message } = error as Error;
    return dispatch(receiveAuthError(message));
  }
};

export const logout = () => ({ type: REQUEST_LOGOUT });
