import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useUser } from "../hooks/auth";
import { register } from "../services/routes";

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const user = useUser();
  return (
    <Route
      {...rest}
      render={props =>
        user.isEmpty ? (
          <Redirect
            to={{
              pathname: register(),
              state: { from: props.location }
            }}
          />
        ) : (
          Component && <Component {...props} />
        )
      }
    />
  );
};
