import { GraphQLClient } from "graphql-hooks";
//import memCache from "graphql-hooks-memcache";

const apiEndpoint =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:1337";

export const client = new GraphQLClient({
  url: `${apiEndpoint}/graphql`
  //cache: memCache()
});
