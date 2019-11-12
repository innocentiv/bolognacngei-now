import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useFirebase, FirebaseReducer } from "react-redux-firebase";
import { StateType } from "../store";

export const useUser = () =>
  useSelector<StateType, FirebaseReducer.AuthState>(
    state => state.firebase.auth
  );

export const useAuthError = () =>
  useSelector<StateType, any>(state => state.firebase.authError);

export const useAuthActions = () => {
  const firebase = useFirebase();

  const login = useCallback(
    (email: string, password: string) => firebase.login({ email, password }),
    [firebase]
  );

  const logout = useCallback(() => firebase.logout(), [firebase]);

  const register = useCallback(
    (email: string, password: string) =>
      firebase.createUser({ email, password }),
    [firebase]
  );

  const forgot = useCallback(
    (email: string) =>
      ((firebase.resetPassword as unknown) as ((
        email: string
      ) => Promise<any>))(email),
    [firebase]
  );

  return { login, logout, register, forgot };
};
