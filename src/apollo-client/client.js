import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  // eslint-disable-next-line no-undef
  uri: process.env.REACT_APP_API_URL
});

// Apollo client initialization for GraphQL queries
const client = new ApolloClient({
  cache,
  link
});

export default client;
