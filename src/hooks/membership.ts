import { UseQueryOptions } from "graphql-hooks";
import { useQueryAuth, useMutationAuth } from "./graphql";

const MEMBER_LIST_QUERY = /* GraphQL */ `
  query MemberList {
    members {
      name
      user {
        id
      }
    }
  }
`;

export const useMemberList = (options?: UseQueryOptions<any>) => {
  return useQueryAuth(MEMBER_LIST_QUERY, options);
};

const CREATE_MEMBER_MUTATION = `mutation CreateMember($member: MemberInput!) {
  createMember(input: {data: $member}) {
    member {
      id
    }
  }
}`;

export const useCreateMember = (options?: UseQueryOptions<any>) => {
  return useMutationAuth(CREATE_MEMBER_MUTATION, options);
};
