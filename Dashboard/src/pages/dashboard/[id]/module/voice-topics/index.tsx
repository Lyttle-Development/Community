import { Layout } from '@lyttledev-dashboard/layouts';
import { pagesPrefix } from '@lyttledev-dashboard/pages';
import { getMessage } from '@lyttledev-dashboard/utils';
import { CardModule } from '@lyttledev-dashboard/components/modules';
import { ModuleCardItem } from '@lyttledev-dashboard/components/module-card';

interface VoiceTopicsChannel {
  id: string;
  title: string;
  active: boolean;
}

// Variables:
const pfx = pagesPrefix + 'module.voice-topics.';

// General:
const msgTitle = getMessage(pfx + 'title');
const msgDescription = getMessage(pfx + 'description');

// Card description:
const msgCardDescription = getMessage(pfx + 'card.description');

// Config:
export const getVoiceTopicsConfig = (
  guildId: string,
  moduleId: string | null = null,
  channels: VoiceTopicsChannel[] | null = null,
): CardModule => {
  const subItems =
    channels?.map(
      ({ id, title, active }: VoiceTopicsChannel): ModuleCardItem => ({
        id,
        route: `/dashboard/${guildId}/module/dynamic-voice#channel-${id}`,
        description: msgCardDescription,
        active,
        title: '#' + title,
      }),
    ) ?? [];

  return {
    active: null,
    title: msgTitle,
    description: msgDescription,
    extendable: true,
    id: moduleId,
    // Todo: Add voice topic disable function
    onClick: (...e) => console.log(e),
    route: `/dashboard/${guildId}/module/voice-topics`,
    subItems,
  };
};

function Page() {
  return <>Hiii</>;
}

Page.getLayout = Layout.getDefault;

export default Page;
