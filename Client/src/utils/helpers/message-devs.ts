import { QueueBacklogType, sendMessage } from '../queue';
import client from '../../main';
import { ALLOWED_MESSAGE_LENGTH, DEV_IDS } from '../../../constants';
import { environment } from '../environment';

// Last error message, to prevent spamming the devs
const cache = {
  time: 0,
  message: '',
};

/**
 * Sends a message to the devs.
 * @param error
 * @param note
 */
export function messageDevs(error: Error, note?: string) {
  // Don't message the devs if we're in development
  if (environment.NODE_ENV === 'development') return;

  const message1 = `Heye there my **favorite dev**!

You **overdone** yourself again, didn't you?
Soo, the **reason** I'm **messaging** you...

I did a tiny oopsy, **BUT!!** No worries I **caught** it and just wanted to let you **know.**

This is what we have to work with: (the error)`;

  let message2 = `
\`\`\`ts
${error.stack}
\`\`\``;

  // cut the message if it's too long
  if (message2.length > ALLOWED_MESSAGE_LENGTH) {
    message2 =
      message2.slice(0, ALLOWED_MESSAGE_LENGTH - 40) +
      '\nNOTE: It was cut off here\n```';
  }

  let message3 = '';
  if (note) {
    message3 = `** **
Oh, you really never give me a reason to break this don't you?
I just got the **notification** that we have a note **linked** to **this error**!

This is what you told me to tell you: (the note)
\`\`\`
${note}
\`\`\``;
  }

  const devs = DEV_IDS.map((id) => `<@${id}>`).join(', ');

  message3 += `** **
Well, have **fun** with that!
I'll be **working** just as hard as always and trying to **break** your code!

Love,
~*Community Bot*

*PS: The following dev's were contacted:* ${devs}
\`\`\`
This was an automated message, and was caused by an error in the bot.
It's recommended to fix the problem and remove it from happening again.
\`\`\`
`;

  // if the error is the same as the last error, and the last error was sent less than 5 seconds ago, return
  if (cache.time > Date.now() && cache.message === error.stack) return;
  // add 5 seconds to the cache time
  cache.time = Date.now() + 5000;
  // set the cache message
  cache.message = error.stack;

  // send the message to the devs
  for (const dev of DEV_IDS) {
    const channel = client.users.resolve(dev);
    void sendMessage(channel, message1, true, false, QueueBacklogType.CRITICAL);
    void sendMessage(channel, message2, true, false, QueueBacklogType.CRITICAL);
    void sendMessage(channel, message3, true, false, QueueBacklogType.CRITICAL);
  }
}
