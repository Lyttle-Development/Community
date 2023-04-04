import { config } from 'dotenv';

config();

const requiredEnvironmentVariables = [
  'BOT_TOKEN',
  'CLIENT_ID',
  'ALLOWED_ERROR_COUNT',
  'ALLOWED_REQUESTS_MINUTE',
  'ALLOWED_MESSAGE_LENGTH',
] as const;

export type Environment =
  | (typeof requiredEnvironmentVariables)[number]
  | string;

const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
  (k) => !Object.keys(process.env).includes(k)
);

if (missingEnvironmentVariables.length > 0) {
  console.error(
    "We're missing the following environment variables:",
    missingEnvironmentVariables
  );
  process.exit(1);
}

export const environment = process.env as Record<Environment, string>;
