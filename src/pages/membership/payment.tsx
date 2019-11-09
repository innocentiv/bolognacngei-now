import * as React from "react";
import { RouteComponentProps } from "react-router";
import { overview } from "../../services/routes";
import { Link } from "react-router-dom";

interface IMembershipPaymentProps extends RouteComponentProps<{ id: string }> {}

const MembershipPayment: React.FC<IMembershipPaymentProps> = ({ match }) => {
  const { id } = match.params;
  return (
    <>
      <h3>Membership Payment</h3>
      user id: {id}
      <Link to={overview()}>Go to Overview</Link>
    </>
  );
};

export default MembershipPayment;
