import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "./components/layout";
import { BrowserRouter } from "react-router-dom";
import { ClientContext } from "graphql-hooks";
import { client } from "./services/api";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";
import { CssBaseline } from "@material-ui/core";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <ClientContext.Provider value={client}>
            <Layout />
          </ClientContext.Provider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
