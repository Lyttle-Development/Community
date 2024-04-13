const env = process.env;

export const graphQlUrl =
  env.NEXT_PUBLIC_GRAPHQL_URL ||
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  'http://localhost:3000/graphql';

export const loginUrl =
  env.NEXT_PUBLIC_LOGIN_URL ||
  process.env.NEXT_PUBLIC_LOGIN_URL ||
  'http://localhost:3000/auth/login';
export const logoutUrl =
  env.NEXT_PUBLIC_LOGOUT_URL ||
  process.env.NEXT_PUBLIC_LOGOUT_URL ||
  'http://localhost:3000/auth/logout';
export const loginReturnUrl =
  env.NEXT_PUBLIC_LOGIN_URL_RETURN ||
  process.env.NEXT_PUBLIC_LOGIN_URL_RETURN ||
  'http://localhost:3000/auth/discord';
export const checkLoginUrl =
  env.NEXT_PUBLIC_CHECK_URL ||
  process.env.NEXT_PUBLIC_CHECK_URL ||
  'http://localhost:3000/';
