import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer as auth } from "./auth/reducer";
import { loadState, saveState } from "../services/localStorage";

const rootReducer = combineReducers({
  auth
});

const persistedState = loadState();

export const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  const state = store.getState();
  saveState({
    auth: state.auth
  });
});

export type StateType = ReturnType<typeof rootReducer>;
