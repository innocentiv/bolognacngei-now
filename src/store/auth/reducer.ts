import {
  AuthActionTypes,
  IAuthState,
  RECEIVE_AUTH_ERROR,
  RECEIVE_USER_DATA,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_REGISTRATION
} from "./types";

export const authReducer = (
  state: IAuthState = {
    loading: false
  },
  action: AuthActionTypes
): IAuthState => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        loading: true
      };

    case REQUEST_LOGOUT:
      return {
        loading: false
      };

    case REQUEST_REGISTRATION:
      return {
        loading: true
      };

    case RECEIVE_USER_DATA:
      return {
        loading: false,
        jwt: action.payload.jwt,
        user: action.payload.user
      };

    case RECEIVE_AUTH_ERROR:
      return {
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
};
