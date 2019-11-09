import { IUserData } from "../../services/auth";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const REQUEST_LOGOUT = "REQUEST_LOGOUT";
export const REQUEST_REGISTRATION = "REQUEST_REGISTRATION";
export const RECEIVE_USER_DATA = "RECEIVE_USER_DATA";
export const RECEIVE_AUTH_ERROR = "RECEIVE_AUTH_ERROR";

export interface IAuthState {
  loading: boolean;
  error?: string;
  jwt?: string;
  user?: IUserData;
}

interface IRequestLoginAction {
  type: typeof REQUEST_LOGIN;
  payload: {
    email: string;
    password: string;
  };
}

interface IRequestLogoutAction {
  type: typeof REQUEST_LOGOUT;
}

interface IRequestRegistrationAction {
  type: typeof REQUEST_REGISTRATION;
  payload: {
    username: string;
    email: string;
    password: string;
  };
}

interface IReceiveUserDataAction {
  type: typeof RECEIVE_USER_DATA;
  payload: {
    jwt: string;
    user: IUserData;
  };
}

interface IReceiveAuthError {
  type: typeof RECEIVE_AUTH_ERROR;
  payload: {
    error: string;
  };
}

export type AuthActionTypes =
  | IRequestLoginAction
  | IRequestLogoutAction
  | IReceiveUserDataAction
  | IRequestRegistrationAction
  | IReceiveAuthError;
