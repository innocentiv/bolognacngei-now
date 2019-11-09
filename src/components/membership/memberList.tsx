import * as React from "react";
import { useQueryAuth } from "../../hooks/graphql";
import { membershipData } from "../../services/routes";
import { Link } from "react-router-dom";

const MEMBER_LIST_QUERY = /* GraphQL */ `
  query MemberList {
    members {
      id
      name
      user {
        id
      }
    }
  }
`;

interface IMemberListProps {}

const MemberList: React.FC<IMemberListProps> = props => {
  const { error, data, loading } = useQueryAuth(MEMBER_LIST_QUERY);

  if (error) return <span>{error}</span>;
  if (loading) return <span>Loading List</span>;
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
