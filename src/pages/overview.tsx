import * as React from "react";
import { useUser } from "../hooks/auth";
import MemberList from "../components/membership/memberList";
import CreateMember from "../components/membership/createMember";
import PageWrapper from "../components/pageWrapper";

const Overview: React.FC = () => {
  const user = useUser();
  return (
    <div>
      {user && (
        <PageWrapper>
          <MemberList />
          <CreateMember />
        </PageWrapper>
      )}
    </div>
  );
};

export default Overview;
