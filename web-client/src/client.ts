import { ApolloClient, InMemoryCache } from "@apollo/client/core";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  credentials: `include`,
  cache: new InMemoryCache(),
});
