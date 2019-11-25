import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { authForgot } from "../../services/routes";
import { useQuery } from "../../hooks/router";

interface IAuthHandlerProps extends RouteComponentProps {}

const AuthHandler: React.FC<IAuthHandlerProps> = () => {
  const query = useQuery();
  const mode = query.get("mode");
  const code = query.get("oobCode");

  if (mode === "resetPassword" && code) {
    return <Redirect to={authForgot(code)} />;
  }
  return null;
};

export default AuthHandler;
