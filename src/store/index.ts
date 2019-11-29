import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
import {
  ReactReduxFirebaseProviderProps,
  firebaseReducer,
  FirebaseReducer
} from "react-redux-firebase";
import thunk from "redux-thunk";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
} as const;

firebase.initializeApp(config);
firebase.firestore();

const rootReducer = combineReducers<{
  firebase: FirebaseReducer.Reducer;
  firestore: any;
}>({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const rrfConfig = {
  //userProfile: "users",
  //useFirestoreForProfile: true
  allowMultipleListeners: true
} as any;

const initialState = {};
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export const rrfProps: ReactReduxFirebaseProviderProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

export type StateType = ReturnType<typeof rootReducer>;
