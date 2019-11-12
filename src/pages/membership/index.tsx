import * as React from "react";
import { RouteComponentProps, Route } from "react-router";
import {
  membershipData,
  membershipHealth,
  membershipPayment,
  membershipReduction
} from "../../services/routes";
import MembershipData from "./data";
import MembershipHealth from "./health";
import MembershipPayment from "./payment";
import MembershipReduction from "./reduction";
import { Elements } from "react-stripe-elements";

interface IMembersProps extends RouteComponentProps {}

const Members: React.FC<IMembersProps> = () => {
  return (
    <>
      <Route path={membershipData()} component={MembershipData} />
      <Route path={membershipHealth()} component={MembershipHealth} />
      <Route path={membershipReduction()} component={MembershipReduction} />

      <Route
        path={membershipPayment()}
        render={props => (
          <Elements>
            <MembershipPayment {...props} />
          </Elements>
        )}
      />
    </>
  );
};

export default Members;
