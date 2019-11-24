import * as React from "react";
import { Redirect, Route, RouteProps, RedirectProps } from "react-router";
import { useUser } from "../hooks/auth";
import Loader from "./core/loader";

export const RedirectUserRoute: React.FC<RouteProps & RedirectProps> = ({
  component: Component,
  to,
  ...rest
}) => {
  const [, loaded, empty] = useUser();
  return (
    <Route
      {...rest}
      render={props => {
        if (!loaded) return <Loader />;
        if (empty) return Component && <Component {...props} />;
        return <Redirect to={to} />;
      }}
    />
  );
};
