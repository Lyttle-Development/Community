import { Layout } from '@lyttledev-dashboard/layouts';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { getMessage } from '@lyttledev-dashboard/utils';
import { CardModule } from '@lyttledev-dashboard/components/modules';

// Variables:
const pfx = pagesPrefix + 'module.voice-topics.';

// General:
const msgTitle = getMessage(pfx + 'title');
const msgDescription = getMessage(pfx + 'description');

// Config:
export const getVoiceTopicsConfig = (guildId: string): CardModule => ({
  active: null,
  title: msgTitle,
  description: msgDescription,
  extendable: true,
  id: null,
  // Todo: Add voice topic disable function
  onClick: (...e) => console.log(e),
  route: `/dashboard/${guildId}/module/voice-topics`,
  subItems: [],
});

function Page() {
  return <>Hiii</>;
}

Page.getLayout = Layout.getDefault;

export default Page;
