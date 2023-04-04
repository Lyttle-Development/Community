import { sendMessage } from '../queue/messages';
import { QueueBacklogType } from '../queue';
import client from '../../main';

const devs = ['132487290835435521', '548240698869284884'];

export function messageDevs(error: Error, note?: string) {
  let message = `Heye there my **favorite dev**!

You **overdone** yourself again, didn't you?
Soo, the **reason** I'm **messaging** you...

I did a tiny oopsy, **BUT!!** No worries I **caught** it and just wanted to let you **know.**
\`\`\`bash
${error.stack}
\`\`\``;

  if (note)
    message += `
Oh, you really never give me a reason to break this don't you?
I just got the **notification** that we have a note **linked** to **this error**!
\`\`\`
${note}
\`\`\``;

  message += `
Well, have **fun** with that!
I'll be **working** just as hard as always and trying to **break** your code!

Love,
*Community Bot*
`;

  for (const dev of devs) {
    const channel = client.users.resolve(dev);
    sendMessage(channel, message, false, false, QueueBacklogType.CRITICAL);
  }
}