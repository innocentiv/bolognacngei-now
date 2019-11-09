import { useContext, useEffect } from "react";
import {
  ClientContext,
  useQuery,
  UseQueryOptions,
  useMutation,
  UseClientRequestOptions
} from "graphql-hooks";
import { useUser } from "./auth";

export const useGraphqlAuth = () => {
  const client = useContext(ClientContext);
  const { jwt } = useUser();
  useEffect(() => {
    if (client) {
      if (jwt) {
        client.setHeader("Authorization", `Bearer ${jwt}`);
      } else {
        client.removeHeader("Authorization");
      }
    }
  }, [client, jwt]);
};

export const useQueryAuth = <T, V extends {}>(
  query: string,
  options?: UseQueryOptions<V>
) => {
  useGraphqlAuth();
  return useQuery<T>(query, options);
};

export const useMutationAuth = <T>(
  query: string,
  options?: UseClientRequestOptions
) => {
  useGraphqlAuth();
  return useMutation<T>(query, options);
};
