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
import { cleanChannelName, getHighestPosition } from './utils';

interface LocalCache {
  [key: string]: VoiceChannel;
}

const localCache: LocalCache = {};

/**
 * Create a voice topic child channel.
 * This function handles the full stack of this event.
 * @param guildMember
 * @param interaction
 */
export async function createVoiceTopicChild(
  guildMember: GuildMember,
  interaction: ModalSubmitInteraction,
) {
  // Get interaction id, to use in local cache.
  const { id } = interaction;

  // Get modal values
  const modalTopic = interaction.fields.getTextInputValue('topic');
  const modalLimit =
    parseInt(interaction.fields.getTextInputValue('limit')) || 0;

  // Check if modal values are valid.
  if (modalLimit < 1 || modalLimit > 99) return;

  // Get interaction channel.
  const interactionChannel = interaction.channel as TextChannel;

  // Defer reply. (thinking response)
  await interaction.deferReply({ ephemeral: true });

  // Get the db entry.
  const db_VoiceGrowth: GuildModuleVoiceGrowthWithChilds =
    await findSingleGuildModuleVoiceGrowth(
      interactionChannel.guild.id,
      interactionChannel.id,
    );

  // Check if db entry exists.
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

/**
 * Creates the channel. (in db & discord)
 * @param id
 * @param interaction
 * @param interactionChannel
 * @param db_VoiceGrowth
 * @param topic
 * @param limit
 */
async function createChannel(
  id: string,
  interaction: ModalSubmitInteraction,
  interactionChannel: TextChannel,
  db_VoiceGrowth: GuildModuleVoiceGrowthWithChilds,
  topic: string,
  limit: number,
): Promise<void> {
  // Get the highest position of all child channels.
  const highestChannelPosition = await getHighestPosition(db_VoiceGrowth);
  // Get the position to add the new channel.
  const addPosition = highestChannelPosition + 1;

  // Clean & get the channel name.
  const channelName = await cleanChannelName(db_VoiceGrowth, topic);

  // Create the channel
  const channelAction = async () => {
    // Create the channel, hidden from everyone.
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

    // Add the channel to the local cache.
    localCache[id] = channel;

    // Move the channel to the correct position.
    await channel.setPosition(addPosition);
    // Reset/Lock the permissions.
    await channel.lockPermissions();

    // Add the channel to the db.
    await createGuildModuleVoiceGrowthChild(
      interactionChannel.guildId,
      channel.id,
      interactionChannel.id,
      channelName,
    );
  };

  // Queue the channel creation.
  queue(QueueBacklogType.URGENT, channelAction);
}

/**
 * Sends a response to the user.
 * @param interaction
 * @param guildMember
 * @param defaultVariables
 */
async function sendResponse(
  interaction: ModalSubmitInteraction,
  guildMember: GuildMember,
  defaultVariables: ModuleConfigGlobalVariables.DefaultVariables,
) {
  // Get the guild id.
  const { guildId } = guildMember;

  // set the timeout
  const timeout = 10; // Seconds
  // Calculate the delete time.
  const deleteTime = Math.round(new Date().getTime() / 1000) + timeout;

  // Create the variables.
  const createdVariables: ModuleConfigCommunicationVoiceTopicTxtSuccess.Variables =
    {
      ...defaultVariables,
      time: deleteTime,
    };

  // Get the message.
  const msgCreated =
    await getMessage<ModuleConfigCommunicationVoiceTopicTxtSuccess.Variables>(
      guildId,
      'Communication.voice-topic.txt.success',
      createdVariables,
    );

  // Create queue action.
  const createAction = async () => {
    // Update the reply.
    await interaction.editReply({
      content: msgCreated,
    });
  };

  // Queue response
  queue(QueueBacklogType.URGENT, createAction);
}

/**
 * Deletes the channel, when needed.
 * @param id
 */
function deleteChannel(id: string) {
  // Get the channel. (out of cache)
  const channel = localCache[id];
  // Check if channel exists and has no members.
  if (!channel || channel.members.size > 0) return;

  // Create the delete action.
  const deleteAction = async () => {
    // Check if channel still exists.
    if (!channel) return;
    // Get the channel id and guild id.
    const { id: channelId, guildId } = channel;
    // Delete the channel.
    await channel.delete();
    // Delete the channel from the database.
    await delGuildModuleVoiceGrowthChild(guildId, channelId);
  };
  // Queue the delete action.
  queue(QueueBacklogType.URGENT, deleteAction);
}

/**
 * Updates the response, when needed.
 * @param id
 * @param interaction
 * @param guildMember
 * @param defaultVariables
 */
async function updateResponse(
  id: string,
  interaction: ModalSubmitInteraction,
  guildMember: GuildMember,
  defaultVariables: ModuleConfigGlobalVariables.DefaultVariables,
) {
  // Get the guild id.
  const { guildId } = guildMember;
  // Get the channel. (out of cache)
  const channel = localCache[id];
  // Check if channel exists & has members.
  const deleted = !channel || channel?.members?.size < 0;

  // Get the message.
  const content = deleted
    ? await getMessage<ModuleConfigCommunicationVoiceTopicTxtDeleted.Variables>(
        guildId,
        'Communication.voice-topic.txt.deleted',
        defaultVariables,
      )
    : await getMessage<ModuleConfigCommunicationVoiceTopicTxtJoined.Variables>(
        guildId,
        'Communication.voice-topic.txt.joined',
        defaultVariables,
      );

  // Create the edit action.
  const editAction = async () => {
    // Update the reply.
    await interaction.editReply({ content });
  };
  // Queue the edit action.
  queue(QueueBacklogType.URGENT, editAction);
}
