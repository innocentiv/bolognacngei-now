import * as React from "react";
import { useUser } from "../hooks/auth";
import MemberList from "../components/membership/memberList";
import CreateMember from "../components/membership/createMember";
import CreateSupporter from "../components/membership/createSupporter";
import PageWrapper from "../components/pageWrapper";

const Overview: React.FC = () => {
  const user = useUser();
  return (
    <div>
      {user && (
        <>
          <PageWrapper>
            <MemberList />
          </PageWrapper>
          <PageWrapper>
            <CreateMember />
          </PageWrapper>
          <PageWrapper>
            <CreateSupporter />
          </PageWrapper>
        </>
      )}
    </div>
  );
};

export default Overview;
