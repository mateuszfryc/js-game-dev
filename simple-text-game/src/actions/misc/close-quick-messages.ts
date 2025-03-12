import { Action, ActionResult } from '../../action';

export const closeQuickMessages = new Action({
  name: 'close quick messages',

  run({ quickMessages, messageLog }): ActionResult {
    quickMessages.setClass('');
    messageLog.removeClass('dimmed');
    quickMessages.clear();

    return { dontPrintInput: true, isDone: true };
  },
});
