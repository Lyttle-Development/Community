import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { Constants } from '../constants';
import { onError } from '@apollo/client/link/error';
import { headers } from 'next/headers';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      const locationsMsg = locations
        ? `\n - Column: ${locations[0]?.column}\n - Line: ${locations[0]?.line}`
        : '';
      // window.alert('Error: ' + message);
      console.error(
        `[GraphQL error]:\n - Message: ${message}${locationsMsg}\n - Path: ${path}`,
      );
    });
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const headersInstance = headers();

const httpLink = createHttpLink({
  uri: Constants.graphQlUrl,
  credentials: 'include',
  headers: {
    cookie: headersInstance.get('cookie') ?? '',
  },
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  credentials: 'include',
});
