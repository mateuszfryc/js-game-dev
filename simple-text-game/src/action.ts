import { Entity } from './entity';
import { Hints } from './hints';
import { InputHistory } from './input-history';
import { GameWorldLocation } from './location';
import { Menu } from './menu';
import { MessageLog } from './message-log';
import { Player } from './player/player';
import { Settings } from './settings';
import { Messages } from './types';

export type ActionInput = {
  actions: {
    blocking: Action[];
  };
  settings: Settings;
  quickMessages: MessageLog;
  messageLog: MessageLog;
  hints: Hints;
  savedGames: string[];
  input: string;
  inputPhrases: string[];
  triggerWord: string;
  potentialTargets: Entity[];
  player: Player;
  currentLocation: GameWorldLocation;
  previousTarget: Entity;
  inputHistory: InputHistory;
};

export type PendingActionState = {
  action: Action;
  triggerWord: string;
  input?: string;
  persist?: boolean;
};

export type ActionResult = {
  blockingActions?: Action[];
  callToAction?: string;
  clearMessageLog?: boolean;
  dontPrintInput?: boolean;
  enterLocation?: string;
  goToMenu?: Menu;
  isDone?: boolean;
  error?: Messages;
  messages?: Messages;
  pendingState?: PendingActionState;
  quickMessages?: Messages;
  showEnterLocationInfo?: boolean;
  showLocationDescription?: boolean;
  target?: Entity;
};

export type ActionReactions = {
  emptyInput?: ActionResult;
  firstCall?: ActionResult;
  dimmOlderMessages?: boolean;
};

export type ActionTemplate = {
  keyWords?: string[];
  name?: string;
  reactions?: ActionReactions;
  run(input: ActionInput): ActionResult;
};

let lastActionId = 0;

export class Action {
  id: number;
  keyWords: string[];
  callsCount: number;
  name?: string;
  // onBeforeRun?: ((input: ActionInput) => ActionResult) | ActionResult;
  _run: (input: ActionInput) => ActionResult;

  reactions?: ActionReactions;

  constructor(template: ActionTemplate) {
    this.id = lastActionId++;
    this.keyWords = template.keyWords ?? [];
    this.callsCount = 0;
    this.reactions = template.reactions;
    this._run = template.run.bind(this);

    if (template.name) this.name = template.name;
  }

  run(input: ActionInput): ActionResult {
    const { reactions } = this;

    if (reactions) {
      const { emptyInput, firstCall, dimmOlderMessages } = reactions;

      if (dimmOlderMessages) input.messageLog.dimmOlderMessages();
      if (firstCall && this.callsCount === 0) return firstCall;
      if (emptyInput && input.input === '') return emptyInput;
    }

    return this._run(input);
  }
}
