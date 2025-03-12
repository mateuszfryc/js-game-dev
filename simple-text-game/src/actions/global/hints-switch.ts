// this.print('Type start and hit Enter on your keyboard to begin');

import { Action, ActionResult } from '../../action';

export const hintsSwitch = new Action({
  keyWords: ['show hints', 'hide hints'],

  run({ hints }): ActionResult {
    hints.switch();

    return { dontPrintInput: true };
  },
});
