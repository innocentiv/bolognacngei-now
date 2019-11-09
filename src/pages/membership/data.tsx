import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { membershipHealth } from "../../services/routes";

interface IMembershipDataProps extends RouteComponentProps<{ id: string }> {}

const MembershipData: React.FC<IMembershipDataProps> = ({ match }) => {
  const { id } = match.params;
  return (
    <>
      <h3>Membership Data</h3>
      user id: {id}
      <Link to={membershipHealth(id)}>Go to Health</Link>
    </>
  );
};

export default MembershipData;
