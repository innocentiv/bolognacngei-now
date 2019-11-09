import * as React from "react";
import { useCallback, useEffect } from "react";
import { useMutationAuth } from "../../hooks/graphql";
import { useLocation } from "../../hooks/router";
import { membershipData } from "../../services/routes";
import { useUser } from "../../hooks/auth";
import { Mutation, MemberInput } from "../../types/graphql";

const CREATE_MEMBER_MUTATION = `mutation CreateMember($member: MemberInput!) {
  createMember(input: {data: $member}) {
    member {
      id
    }
  }
}`;

interface ICreateMemberProps {}

const CreateMember: React.FC<ICreateMemberProps> = () => {
  const { user } = useUser();
  const [createMember, { error, data, loading }] = useMutationAuth<Mutation>(
    CREATE_MEMBER_MUTATION
  );
  const { navigate } = useLocation();
  const handleButtonClick = useCallback(() => {
    const newMember: MemberInput = {
      name: "test Relation",
      user: user && user._id
    };

    createMember({
      variables: {
        member: newMember
      }
    });
  }, [createMember, user]);

  useEffect(() => {
    if (
      data &&
      data.createMember &&
      data.createMember.member &&
      data.createMember.member.id
    ) {
      navigate(membershipData(data.createMember.member.id));
    }
  }, [navigate, data]);

  if (error) return <span>{error}</span>;
  if (loading) return <span>Loading List</span>;
  return <button onClick={handleButtonClick}>Create User</button>;
};

export default CreateMember;
