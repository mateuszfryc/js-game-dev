import { Action, ActionResult } from '../../action';

export const enterToContinue = new Action({
  name: 'enter to continue',
  reactions: {
    firstCall: {
      dontPrintInput: true,
    },
  },

  run(): ActionResult {
    return { dontPrintInput: true, isDone: true };
  },
});
