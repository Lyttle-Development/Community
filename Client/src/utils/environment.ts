import { config } from 'dotenv';

config();

const requiredEnvironmentVariables = [
  'NODE_ENV',
  'CLIENT_ID',
  'BOT_TOKEN',
  'DATABASE_URL',
] as const;

export type Environment =
  | (typeof requiredEnvironmentVariables)[number]
  | string;

const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
  (k) => !Object.keys(process.env).includes(k),
);

if (missingEnvironmentVariables.length > 0) {
  console.error(
    'We are missing the following environment variables:',
    missingEnvironmentVariables,
  );
  process.exit(1);
}

export const environment = process.env as Record<Environment, string>;
