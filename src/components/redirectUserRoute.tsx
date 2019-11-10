import * as React from "react";
import { Redirect, Route, RouteProps, RedirectProps } from "react-router";
import { useUser } from "../hooks/auth";

export const RedirectUserRoute: React.FC<RouteProps & RedirectProps> = ({
  component: Component,
  to,
  ...rest
}) => {
  const user = useUser();
  return (
    <Route
      {...rest}
      render={props =>
        user.isEmpty ? (
          Component && <Component {...props} />
        ) : (
          <Redirect to={to} />
        )
      }
    />
  );
};
