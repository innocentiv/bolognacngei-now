import * as React from "react";
import { RouteComponentProps, Route } from "react-router";
import { adminActions } from "../../services/routes";
import AdminActions from "./actions";

interface IMembersProps extends RouteComponentProps {}

const Members: React.FC<IMembersProps> = () => {
  return (
    <>
      <Route path={adminActions()} component={AdminActions} />
    </>
  );
};

export default Members;
