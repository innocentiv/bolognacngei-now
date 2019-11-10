import * as React from "react";
import { membershipData } from "../../services/routes";
import { Link } from "react-router-dom";
import { useGetMemberList } from "../../hooks/membership";

interface IMemberListProps {}

const MemberList: React.FC<IMemberListProps> = props => {
  const members = useGetMemberList();
  return (
    <ul>
      {members &&
        members.map((member: any, index: number) => (
          <li key={index}>
            {member.name}
            <Link to={membershipData(member.id)}>Go to Data</Link>
          </li>
        ))}
    </ul>
  );
};

export default MemberList;
