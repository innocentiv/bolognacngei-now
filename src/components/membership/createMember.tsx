import * as React from "react";
import { useCallback, useEffect } from "react";
import { useCreateMember } from "../../hooks/membership";
import { useLocation } from "../../hooks/router";
import { membershipData } from "../../services/routes";
import { useUser } from "../../hooks/auth";
import { Member } from "../../types/member";

interface ICreateMemberProps {}

const CreateMember: React.FC<ICreateMemberProps> = () => {
  const createMember = useCreateMember();

  //const { navigate } = useLocation();
  // const handleButtonClick = useCallback(() => {
  //   const newMember: Member = {
  //     name: "test Relation",
  //     user:
  //   };

  //   createMember({
  //     variables: {
  //       member: newMember
  //     }
  //   });
  // }, [createMember, user]);

  // useEffect(() => {
  //   if (
  //     data &&
  //     data.createMember &&
  //     data.createMember.member &&
  //     data.createMember.member.id
  //   ) {
  //     navigate(membershipData(data.createMember.member.id));
  //   }
  // }, [navigate, data]);

  // if (error) return <span>{error}</span>;
  // if (loading) return <span>Loading List</span>;
  return <button>Create User</button>;
};

export default CreateMember;
