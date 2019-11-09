import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../store";
import {
  login as loginAction,
  register as registerAction,
  logout as logoutAction
} from "../store/auth/actions";
import { IAuthState } from "../store/auth/types";

export const useUser = () =>
  useSelector<StateType, IAuthState>(state => state.auth);

export const useAuthActions = () => {
  const dispatch = useDispatch();

  const login = useCallback(
    (email: string, password: string) => dispatch(loginAction(email, password)),
    [dispatch]
  );

  const logout = useCallback(() => dispatch(logoutAction()), [dispatch]);

  const register = useCallback(
    (username: string, email: string, password: string) =>
      dispatch(registerAction(username, email, password)),
    [dispatch]
  );

  return { login, logout, register };
};
