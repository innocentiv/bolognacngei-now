import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  useFirebase,
  FirebaseReducer,
  isLoaded,
  isEmpty
} from "react-redux-firebase";
import { StateType } from "../store";

export const useUser = () => {
  const user = useSelector<StateType, FirebaseReducer.AuthState>(
    state => state.firebase.auth
  );
  const loaded = isLoaded(user);
  const empty = isEmpty(user);
  return [user, loaded, empty] as const;
};

export const useAuthError = () =>
  useSelector<StateType, any>(state => state.firebase.authError);

export const useAuthActions = () => {
  const firebase = useFirebase();

  const isEmailRegistered = useCallback(
    async (email: string) => {
      try {
        const availableMethod = await firebase
          .auth()
          .fetchSignInMethodsForEmail(email);
        if (Array.isArray(availableMethod) && availableMethod.length > 0)
          return true;
        return false;
      } catch {
        return false;
      }
    },
    [firebase]
  );

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
      ((firebase.resetPassword as unknown) as (email: string) => Promise<any>)(
        email
      ),
    [firebase]
  );

  return { login, logout, register, forgot, isEmailRegistered };
};
