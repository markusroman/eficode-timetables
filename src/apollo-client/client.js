import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

console.log('environment variables:');
console.log('api url: ' + process.env.REACT_APP_API_URL);

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_API_URL
});

// Apollo client initialization for GraphQL queries
const client = new ApolloClient({
  cache,
  link
});

export default client;
