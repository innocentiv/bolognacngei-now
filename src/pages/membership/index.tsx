import * as React from "react";
import { RouteComponentProps, Route } from "react-router";
import {
  membershipData,
  membershipHealth,
  membershipPayment
} from "../../services/routes";
import MembershipData from "./data";
import MembershipHealth from "./health";
import MembershipPayment from "./payment";

interface IMembersProps extends RouteComponentProps {}

const Members: React.FC<IMembersProps> = () => {
  return (
    <>
      <Route path={membershipData()} component={MembershipData} />
      <Route path={membershipHealth()} component={MembershipHealth} />
      <Route path={membershipPayment()} component={MembershipPayment} />
    </>
  );
};

export default Members;
