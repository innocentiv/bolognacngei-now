import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { membershipPayment } from "../../services/routes";

interface IMembershipHealthProps extends RouteComponentProps<{ id: string }> {}

const MembershipHealth: React.FC<IMembershipHealthProps> = ({ match }) => {
  const { id } = match.params;
  return (
    <>
      <h3>Membership Health</h3>
      user id: {id}
      <Link to={membershipPayment(id)}>Go to Payment</Link>
    </>
  );
};

export default MembershipHealth;
