import { GuildMember } from '../../../types';
import {
  ChannelType,
  ModalSubmitInteraction,
  TextChannel,
  VoiceChannel,
} from 'discord.js';
import { queue, QueueBacklogType, sleep } from '../../../utils';
import { getMessage, getMessageVariables } from '../../../utils/get-message';
import {
  ModuleConfigCommunicationVoiceTopicTxtDeleted,
  ModuleConfigCommunicationVoiceTopicTxtJoined,
  ModuleConfigCommunicationVoiceTopicTxtSuccess,
  ModuleConfigGlobalVariables,
} from '../../../../../Content';
import {
  createGuildModuleVoiceGrowthChild,
  delGuildModuleVoiceGrowthChild,
  findSingleGuildModuleVoiceGrowth,
  GuildModuleVoiceGrowthWithChilds,
} from '../../../database/handlers';
import client from '../../../main';

interface LocalCache {
  [key: string]: VoiceChannel;
}

const localCache: LocalCache = {};

export async function createVoiceTopicChild(
  guildMember: GuildMember,
  interaction: ModalSubmitInteraction,
) {
  const { id } = interaction;
  const modalTopic = interaction.fields.getTextInputValue('topic');
  const modalLimit =
    parseInt(interaction.fields.getTextInputValue('limit')) || 0;
  if (modalLimit < 1 || modalLimit > 99) return;
  const interactionChannel = interaction.channel as TextChannel;

  await interaction.deferReply({ ephemeral: true });

  const db_VoiceGrowth: GuildModuleVoiceGrowthWithChilds =
    await findSingleGuildModuleVoiceGrowth(
      interactionChannel.guild.id,
      interactionChannel.id,
    );

  if (!db_VoiceGrowth) return;

  // Create channel
  await createChannel(
    id,
    interaction,
    interactionChannel,
    db_VoiceGrowth,
    modalTopic,
    modalLimit,
  );

  // get default variables
  const defaultVariables: ModuleConfigGlobalVariables.DefaultVariables =
    await getMessageVariables(guildMember);

  // Send response
  await sendResponse(interaction, guildMember, defaultVariables);

  // Wait for sleep time.
  await sleep(10 * 1000);

  // Deletes channel when needed.
  await deleteChannel(id);

  // Update response.
  await updateResponse(id, interaction, guildMember, defaultVariables);

  // Delete the cache entry.
  delete localCache[id];
}

async function getHighestPosition(
  masterChannel: GuildModuleVoiceGrowthWithChilds,
): Promise<number> {
  let highestChannelPosition = 0;
  const childIds = masterChannel?.childs.map((x) => x.channel_id.toString());
  if (childIds.length < 1) return;
  for (const childId of childIds) {
    const channel = (await client.channels.cache.get(childId)) as VoiceChannel;
    if (channel) {
      highestChannelPosition =
        channel.position > highestChannelPosition
          ? channel.position
          : highestChannelPosition;
    }
  }
  return highestChannelPosition;
}

async function cleanChannelName(
  masterChannel: GuildModuleVoiceGrowthWithChilds,
  topic: string,
): Promise<string> {
  if (topic.length < 1) return 'Unknown';

  let name = topic
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
  if (name.length < 1) return 'Unknown';

  if (masterChannel.prefix && masterChannel.prefix.length > 0) {
    name = masterChannel.prefix + name;
  }

  if (name.length > 100) return name.slice(0, 100);
  return name;
}
async function createChannel(
  id: string,
  interaction: ModalSubmitInteraction,
  interactionChannel: TextChannel,
  db_VoiceGrowth: GuildModuleVoiceGrowthWithChilds,
  topic: string,
  limit: number,
) {
  const highestChannelPosition = await getHighestPosition(db_VoiceGrowth);
  const addPosition = highestChannelPosition + 1;

  const channelName = await cleanChannelName(db_VoiceGrowth, topic);

  // Create the channel
  const channelAction = async () => {
    const channel = await interaction.guild.channels.create({
      name: channelName,
      type: ChannelType.GuildVoice,
      parent: interactionChannel.parent,
      userLimit: limit,
      permissionOverwrites: [
        {
          id: interactionChannel.guild.roles.everyone.id,
          deny: ['ViewChannel'],
        },
      ],
    });
    await channel.setPosition(addPosition);
    await channel.lockPermissions();

    await createGuildModuleVoiceGrowthChild(
      interactionChannel.guildId,
      channel.id,
      interactionChannel.id,
      channelName,
    );

    localCache[id] = channel;
  };
  queue(QueueBacklogType.URGENT, channelAction);
}

async function sendResponse(
  interaction: ModalSubmitInteraction,
  guildMember: GuildMember,
  defaultVariables: ModuleConfigGlobalVariables.DefaultVariables,
) {
  const { guildId } = guildMember;

  const timeout = 10; // Seconds
  const deleteTime = Math.round(new Date().getTime() / 1000) + timeout;

  const createdVariables: ModuleConfigCommunicationVoiceTopicTxtSuccess.Variables =
    {
      ...defaultVariables,
      time: deleteTime,
    };

  const msgCreated =
    await getMessage<ModuleConfigCommunicationVoiceTopicTxtSuccess.Variables>(
      guildId,
      'Communication.voice-topic.txt.success',
      createdVariables,
    );

  // Send response
  const createAction = async () => {
    await interaction.editReply({
      content: msgCreated,
    });
  };

  // Queue response
  queue(QueueBacklogType.URGENT, createAction);
}

function deleteChannel(id: string) {
  const channel = localCache[id];
  if (!channel || channel.members.size > 0) return;

  const deleteAction = async () => {
    const { id: channelId, guildId } = channel;
    await channel.delete();
    await delGuildModuleVoiceGrowthChild(guildId, channelId);
  };
  queue(QueueBacklogType.URGENT, deleteAction);
}

async function updateResponse(
  id: string,
  interaction: ModalSubmitInteraction,
  guildMember: GuildMember,
  defaultVariables: ModuleConfigGlobalVariables.DefaultVariables,
) {
  const { guildId } = guildMember;
  const channel = localCache[id];
  const deleted = !(!channel || channel.members.size > 0);
  const msgJoined =
    await getMessage<ModuleConfigCommunicationVoiceTopicTxtJoined.Variables>(
      guildId,
      'Communication.voice-topic.txt.joined',
      defaultVariables,
    );

  const msgDeleted =
    await getMessage<ModuleConfigCommunicationVoiceTopicTxtDeleted.Variables>(
      guildId,
      'Communication.voice-topic.txt.deleted',
      defaultVariables,
    );

  const content = deleted ? msgDeleted : msgJoined;
  await interaction.editReply({ content });
}
