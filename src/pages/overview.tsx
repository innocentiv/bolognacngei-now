import * as React from "react";
import { useUser } from "../hooks/auth";
import MemberList from "../components/membership/memberList";
import CreateMember from "../components/membership/createMember";
import CreateSupporter from "../components/membership/createSupporter";
import PageWrapper from "../components/pageWrapper";
import { Typography } from "@material-ui/core";

const Overview: React.FC = () => {
  const user = useUser();
  return (
    <div>
      {user && (
        <PageWrapper>
          <MemberList />
          <CreateMember />
          <Typography component="p" style={{ margin: "3rem auto" }}>
            oppure
          </Typography>
          <CreateSupporter />
        </PageWrapper>
      )}
    </div>
  );
};

export default Overview;
