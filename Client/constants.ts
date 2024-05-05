/**
 * The developer's ids.
 * This is used to message the devs when an error occurs.
 */
export const DEV_IDS: string[] = ['132487290835435521', '548240698869284884'];

/**
 * The bot's fake guild id.
 */
export const BOT_FAKE_GUILD_ID = '0';

/**
 * The channel to send the bot logs to.
 */
export const BOT_LOG_CHANNEL_ID = '1096487719603028019';

/**
 * The channel to send the bot logs to.
 */
export const STATS_CHANNEL_ID = '1108822634264801380';

/**
 * The maximum allowed errors.
 * If the "module" has this number, it will be disabled.
 */
export const ALLOWED_ERROR_COUNT = 3;

/**
 * The maximum allowed requests per second.
 * This will be used in the queue.
 */
export const ALLOWED_REQUESTS_SECOND = 10;

/**
 * Maximum allowed message length.
 * This is used to cut off messages that are too long.
 */
export const ALLOWED_MESSAGE_LENGTH = 2000;

/**
 * The maximum allowed characters in a nickname.
 */
export const ALLOWED_NICKNAME_LENGTH = 32;

/**
 * The amount of time in milliseconds that a rate limit is allowed to last.
 */
export const ALLOWED_RATE_LIMIT_TIME = 1500;

/**
 * The maximum allowed rate limit amount.
 */
export const ALLOWED_RATE_LIMIT_AMOUNT = 3;

/**
 * Send stats to logging server every x milliseconds.
 */
export const SEND_STATS_INTERVAL = 1000 * 60 * 5; // 5 minutes

/**
 * Max amount of audit logs to keep in memory.
 */
export const MAX_AUDIT_LOGS = 100;

/**
 * Max audit log age.
 */
export const MAX_AUDIT_LOG_AGE = 20 * 1000; // 20 seconds
