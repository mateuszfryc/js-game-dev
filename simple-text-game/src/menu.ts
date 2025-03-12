import { Action } from './action';
import { Messages } from './types';

export type Menu = {
  actions: Action[];
  messages?: Messages;
  callToAction?: string;
  blockingActions?: Action[];
  showInput?: boolean;
  showCallToAction?: boolean;
  showHints?: boolean;
  unknownActionResponse?: number;
  useInputHistory?: number;
};
