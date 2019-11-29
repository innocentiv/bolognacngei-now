import * as React from "react";
import { Suspense } from "react";
import { useUser } from "../hooks/auth";
import MemberList from "../components/membership/memberList";
import PageWrapper from "../components/pageWrapper";
import CreateMember from "../components/membership/createMember";
import PrivateArea from "../components/membership/privateArea";
import Loader from "../components/core/loader";
const CreateSupporter = React.lazy(() => import("../components/membership/createSupporter"));
const GroupsDownload = React.lazy(() => import("../components/membership/groupsDownload"));

const Overview: React.FC = () => {
  const [user] = useUser();
  return (
    <div>
      {user && (
        <>
          <PageWrapper>
            <PrivateArea />
            <MemberList />
            <Suspense fallback={<Loader />}>
              <GroupsDownload />
            </Suspense>
          </PageWrapper>
          <PageWrapper>
            <CreateMember />
          </PageWrapper>
          <Suspense fallback={<Loader />}>
            <PageWrapper>
              <CreateSupporter />
            </PageWrapper>
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Overview;
