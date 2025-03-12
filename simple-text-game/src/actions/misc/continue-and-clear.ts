// this.print('Type start and hit Enter on your keyboard to begin');

import { Action, ActionResult } from '../../action';
import { hitEnterToConinue } from '../../content/messages';

export const continueAndClear = new Action({
  name: 'continue and clear',
  reactions: {
    firstCall: {
      messages: hitEnterToConinue,
      dontPrintInput: true,
    },
  },

  run(): ActionResult {
    this.callsCount = 0;

    return { dontPrintInput: true, isDone: true, clearMessageLog: true };
  },
});
