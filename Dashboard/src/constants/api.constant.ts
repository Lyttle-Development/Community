export const graphQlUrl =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/graphql';

export const loginUrl =
  process.env.NEXT_PUBLIC_LOGIN_URL || 'http://localhost:3000/auth/login';
export const loginReturnUrl =
  process.env.NEXT_PUBLIC_LOGIN_URL_RETURN ||
  'http://localhost:3000/auth/discord';
export const checkLoginUrl =
  process.env.NEXT_PUBLIC_CHECK_URL || 'http://localhost:3000/';
