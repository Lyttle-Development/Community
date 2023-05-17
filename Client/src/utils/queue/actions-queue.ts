import {
  deleteAllExecutedGuildActions,
  findAllGuildActions,
  setGuildActionAsExecuted,
} from '../../database/handlers';
import { queue, QueueBacklogType } from './queue';
import { log } from '../log';
import { LogType } from '../../types';
import { createVoiceTopicChannel } from '../../modules';

const currentlyBeingExecuted: number[] = [];

interface ActionQueueTypes {
  [key: string]: (...args: any[]) => Promise<any> | any;
}

const actionTypes: ActionQueueTypes = {
  createVoiceTopicChannel: createVoiceTopicChannel,
};

const currentActionTypes = Object.keys(actionTypes);

let waitingForActions = false;

export function checkActionsQueue() {
  if (!waitingForActions) {
    void executeActionsQueue();
  }
}

async function executeActionsQueue() {
  // Set waiting for actions to true
  waitingForActions = true;

  // Get all actions
  const actions = (await findAllGuildActions()) ?? [];
  // Delete all executed actions
  await deleteAllExecutedGuildActions();

  // Check if there are any actions
  if (actions && actions.length < 1) {
    // Set waiting for actions to false
    waitingForActions = false;

    // Stop here.
    return;
  }

  // Loop through all actions
  for (const action of actions) {
    // Check if the action is already executed
    if (action.executed) continue;

    // Check if the action is in the current action types
    if (!currentActionTypes.includes(action.key)) continue;

    // Check if the action is already being executed
    if (currentlyBeingExecuted.includes(action.id)) continue;
    // Add to currently being executed
    currentlyBeingExecuted.push(action.id);

    // Get the action function
    const actionFunction = actionTypes[action.key];
    // Check if the action function exists
    if (!actionFunction) continue;

    // Add the action to the queue
    addActionToQueue(actionFunction, action.id, action.guild_id, action.values);
  }

  // Set waiting for actions to false
  waitingForActions = false;
}

function addActionToQueue(action, id, guildId, valuesString) {
  try {
    // Parse the values
    const values = JSON.parse(valuesString);

    const postAction = async () => {
      // Set as executed
      await setGuildActionAsExecuted(id);
      // Remove from currently being executed
      currentlyBeingExecuted.splice(currentlyBeingExecuted.indexOf(id), 1);
    };

    // Make queue action
    const queueAction = values
      ? async () => {
          // Execute action
          await action(guildId, values);
          // Execute post action
          await postAction();
        }
      : async () => {
          // Execute action
          await action(guildId);
          // Execute post action
          await postAction();
        };

    // Add to queue
    queue(QueueBacklogType.IMPORTANT, queueAction);
  } catch (error) {
    // Log the error
    log(LogType.ERROR, error);
  }
}
