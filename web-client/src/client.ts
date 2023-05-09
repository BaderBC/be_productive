import { ApolloClient, InMemoryCache } from "@apollo/client/core";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_URL + `/graphql`,
  credentials: `include`,
  cache: new InMemoryCache(),
});
