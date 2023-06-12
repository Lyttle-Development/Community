import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { Constants } from '../constants';

const link = createHttpLink({
  uri: Constants.graphQlUrl,
  credentials: 'include',
});

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
