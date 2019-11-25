import * as React from "react";
import { RouteComponentProps, Route } from "react-router";
import { auth, authForgot, authHandler } from "../../services/routes";
import Login from "./login";
import Forgot from "./forgot";
import Handler from "./handler";

interface IAuthProps extends RouteComponentProps {}

const Auth: React.FC<IAuthProps> = () => {
  return (
    <>
      <Route path={auth()} exact component={Login} />
      <Route path={authHandler()} component={Handler} />
      <Route path={authForgot()} component={Forgot} />
    </>
  );
};

export default Auth;
