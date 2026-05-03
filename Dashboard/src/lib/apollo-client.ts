import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { Constants } from '../constants';
import { ErrorLink } from '@apollo/client/link/error';
import { CombinedGraphQLErrors } from '@apollo/client/errors';

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) => {
      const locationsMsg = locations
        ? `\n - Column: ${locations[0]?.column}\n - Line: ${locations[0]?.line}`
        : '';
      // window.alert('Error: ' + message);
      console.error(
        `[GraphQL error]:\n - Message: ${message}${locationsMsg}\n - Path: ${path}`,
      );
    });
  } else {
    console.error(`[Network error]: ${error}`);
  }
});

const httpLink = createHttpLink({
  uri: Constants.graphQlUrl,
  credentials: 'include',
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});
