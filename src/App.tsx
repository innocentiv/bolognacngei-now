import React from "react";
import { Provider } from "react-redux";
import { store, rrfProps } from "./store";
import Layout from "./components/layout";
import { BrowserRouter } from "react-router-dom";
import { ClientContext } from "graphql-hooks";
import { client } from "./services/api";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";
import { CssBaseline } from "@material-ui/core";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { StripeProvider } from "react-stripe-elements";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <StripeProvider
          apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY as string}
        >
          <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
              <ClientContext.Provider value={client}>
                <Layout />
              </ClientContext.Provider>
            </ReactReduxFirebaseProvider>
          </Provider>
        </StripeProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
