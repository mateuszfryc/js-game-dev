import { Action, ActionResult, PendingActionState } from './action';
import { gameplayActions } from './actions/gameplay-actions';
import { globalActions } from './actions/global-actions';
import { Entity } from './entity';
import { Hints } from './hints';
import { InputHistory } from './input-history';
import { GameWorldLocation } from './location';
import { MessageLog } from './message-log';
import { Player } from './player/player';
import { Settings } from './settings';
import { Message } from './types';

export type ActionSearchResult = { action: Action; triggerWord: string };

export type GameState = {
  settings: Settings;
  player: Player;
  messageLog: MessageLog;
  quickMessages: MessageLog;
  hints: Hints;
  savedGames: string[];
  currentLocation: GameWorldLocation;
  previousTarget: Entity;
  playerInput: string;
  inputHistory: InputHistory;
  callToAction: string;
};

export class ActionsHub {
  pending?: PendingActionState;
  maxActionsCallsCount = 100;

  /* All in game actions split into hierarchy allowing to prioritize some actions over another.
     The chain of priority is: global, blocking (sequened), gameplay. */
  /* Actions avilable in most menus of thegam, e.g. help, save, exit etc. */
  global: Action[] = globalActions;

  /* Sequenced actions that will take priority over gameplay actions.
       Allow to run sequenced events and complex menus. */
  sequenced: Action[] = [];

  /* All actions related to interaction with game world. */
  gameplay: Action[] = gameplayActions;

  searchTheActionsGroup(
    sanitizedInput: string,
    actionsGroup: Action[],
  ): ActionSearchResult | undefined {
    const input = sanitizedInput; /* .toLowerCase() */
    let triggerWord;

    // Firstly check if actions could match the full input phrase
    let action = actionsGroup.find(({ keyWords }) => {
      // Check if player input containes any of the key words
      triggerWord = keyWords.find((key) => key === input);

      return Boolean(triggerWord);
    });

    // Only if full phrase doesn't get a match check for each word in input
    if (!action)
      action = actionsGroup.find(({ keyWords }) => {
        // Check if player input containes any of the key words
        triggerWord = keyWords.find((key) => input.includes(key));

        return Boolean(triggerWord);
      });

    if (!action || !triggerWord) return undefined;

    return { action, triggerWord };
  }

  solveAction(
    action: Action,
    triggerWord: string,
    actionInput: string,
    gameState: GameState,
  ): ActionResult {
    const { sequenced } = this;
    const { currentLocation } = gameState;
    const inputPhrases = actionInput.split(' ');
    const entitiesKeys = currentLocation
      ? currentLocation.getContentKeyWords(true).filter((key) => inputPhrases.includes(key))
      : [];

    // TODO think of a mechanics that would allow to choose target (e.g. closest one)
    // or utilise many targets
    const potentialTargets = currentLocation
      ? currentLocation.getMultipleByKeys(entitiesKeys, true)
      : [];

    const result = action.run({
      inputHistory: gameState.inputHistory,
      settings: gameState.settings,
      player: gameState.player,
      quickMessages: gameState.quickMessages,
      messageLog: gameState.messageLog,
      hints: gameState.hints,
      savedGames: gameState.savedGames,
      currentLocation: gameState.currentLocation,
      previousTarget: gameState.previousTarget,
      actions: { blocking: sequenced },
      input: actionInput,
      inputPhrases,
      triggerWord,
      potentialTargets,
    });

    const cta = gameState.callToAction;
    const isCtaDefault = cta === 'What do you do?';
    const isOnBlockingList = sequenced.some((a) => a.id === action.id);
    const outputMessages: Message[] = [];

    if (isOnBlockingList && result.isDone) {
      sequenced.splice(0, 1);
      action.callsCount = 0;
    } //
    else {
      action.callsCount++;
    }

    if (result.blockingActions) sequenced.unshift(...result.blockingActions);
    if (result.pendingState) this.pending = result.pendingState;

    if (result.callToAction) {
      if (cta !== result.callToAction && !isCtaDefault) {
        outputMessages.push(cta);
      }
    }

    // ! Actions that could leave pending state should always inform when they're done
    if (result.isDone) {
      this.pending = undefined;
      if (!isCtaDefault && !isOnBlockingList) {
        outputMessages.push(cta);
      }
      if (!isOnBlockingList) result.callToAction = 'What do you do?';
    }

    const { playerInput } = gameState;
    if (!result.dontPrintInput && playerInput !== '') {
      outputMessages.push([playerInput, { prefix: 'You' }]);
    }

    if (result.messages) {
      if (typeof result.messages === 'string') {
        outputMessages.push(result.messages);
      } //
      else {
        outputMessages.push(...(result.messages as Message[]));
      }
    }

    if (outputMessages.length > 0) result.messages = outputMessages;

    return result;
  }

  solveSequencedActions(actionInput = '', gameState: GameState): ActionResult[] {
    const { sequenced } = this;
    if (sequenced.length <= 0) return [];

    let lastActionInLineId = sequenced[0].id;
    const results: ActionResult[] = [this.solveAction(sequenced[0], '', actionInput, gameState)];

    while (sequenced.length > 0 && sequenced[0].id !== lastActionInLineId) {
      lastActionInLineId = sequenced[0].id;
      results.push(this.solveAction(sequenced[0], '', actionInput, gameState));
    }

    return results;
  }

  /*
    The order of searching for actions is as follows
      1. global actions (help, save, load, settings, etc.)
      2. sequenced (blocking) actions (menus)
      3. gameplay actions
      4. gameplay-pending action
   */
  findAction(
    sanitizedInput: string,
  ): (ActionSearchResult & { actionInput: string; isSequenced?: boolean }) | undefined {
    const { global, sequenced: blocking, gameplay, pending } = this;
    let actionInput = sanitizedInput;

    // global actions
    let result = this.searchTheActionsGroup(sanitizedInput, global);
    if (result) return { ...result, actionInput };

    // check blocking (sequenced) actions
    if (blocking.length > 0)
      return { action: blocking[0], triggerWord: '', actionInput, isSequenced: true };

    // gameplay actions
    result = this.searchTheActionsGroup(sanitizedInput, gameplay);
    if (result) return { ...result, actionInput };

    // check if there is a pending action
    if (pending) {
      result = pending;
      if (pending.input) actionInput += ` ${pending.input}`;

      return { ...result, actionInput };
    }

    return undefined;
  }

  /* Returns true if the action was found */
  findAndSolveAction(sanitizedInput: string, gameState: GameState): ActionResult[] {
    const searchResult = this.findAction(sanitizedInput);

    if (!searchResult) return [];

    const { action, triggerWord, actionInput, isSequenced } = searchResult;

    return isSequenced
      ? this.solveSequencedActions(actionInput, gameState)
      : [this.solveAction(action, triggerWord, actionInput, gameState)];
  }
}
