// this.print('Type start and hit Enter on your keyboard to begin');

import { Action, ActionResult } from '../../action';

export const clearInputHistory = new Action({
  keyWords: ['clearinputhistory'],

  run({ inputHistory }): ActionResult {
    inputHistory.clear();

    return { dontPrintInput: true };
  },
});
