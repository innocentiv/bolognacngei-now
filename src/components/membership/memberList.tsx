import * as React from "react";
import { membershipData } from "../../services/routes";
import { Link } from "react-router-dom";

interface IMemberListProps {}

const MemberList: React.FC<IMemberListProps> = props => {
  const data = {
    members: [{ name: "test", id: "ciaone" }]
  };
  return (
    <ul>
      {data.members.map((member: any, index: number) => (
        <li key={index}>
          {member.name}
          <Link to={membershipData(member.id)}>Go to Data</Link>
        </li>
      ))}
    </ul>
  );
};

export default MemberList;
