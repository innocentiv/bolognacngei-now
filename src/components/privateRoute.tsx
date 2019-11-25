import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useUser } from "../hooks/auth";
import { auth } from "../services/routes";
import Loader from "./core/loader";

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [, loaded, empty] = useUser();
  return (
    <Route
      {...rest}
      render={props => {
        if (!loaded) return <Loader />;
        if (empty)
          return (
            <Redirect
              to={{
                pathname: auth(),
                state: { from: props.location }
              }}
            />
          );
        return Component && <Component {...props} />;
      }}
    />
  );
};
