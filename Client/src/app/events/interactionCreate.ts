// import { Interaction } from 'discord.js';
// import { ServerUser } from '../../types/events';
// import createEvent from '../../utils/features/points/createEvent';
// import getMessages from '../../utils/messages/getMessages';
// import { MessageValues } from '../../types/messages';
// import getMessagesValues from '../../utils/messages/getMessagesValues';
// import { getCommandHandler } from '../interactions/commands/handler';
// import { getModalHandler } from '../interactions/modals/handler';
// import { getButtonHandler } from '../interactions/buttons/handler';
//
// async function interactionCreate(interaction: Interaction): Promise<void> {
//   const serverUser: ServerUser = {
//     userId: interaction.user.id,
//     guildId: interaction.guild.id,
//   };
//   createEvent(serverUser, 'command');
//
//   let handler = getCommandHandler(interaction);
//   if (interaction.isButton()) handler = getButtonHandler(interaction);
//   if (interaction.isModalSubmit()) handler = getModalHandler(interaction);
//
//   if (handler === undefined) {
//     if (interaction.isRepliable()) {
//       const guildId = interaction.guild?.id ?? '0';
//       const userId = interaction.member.user.id ?? '0';
//       const messageValues: MessageValues = await getMessagesValues(
//         guildId,
//         userId
//       );
//       const message = await getMessages(
//         guildId,
//         ['global', 'text', 'error:interaction_not_found'],
//         messageValues
//       );
//       interaction.reply(message); // todo: internationalisation
//       return;
//     }
//
//     return; // todo: zoek iets uit om te antwoorden
//   }
//
//   return handler(interaction);
// }
//
// export default interactionCreate;
