import { Action, ActionResult } from '../../action';
import { typeBackToReturn } from '../../content/messages';

export const load = new Action({
  keyWords: ['load'],

  run({ savedGames, messageLog }): ActionResult {
    if (savedGames.length === 0) {
      messageLog.clear();

      return {
        messages: [`You don't have any saved games yet`, typeBackToReturn],
        dontPrintInput: true,
      };
    }

    return {};
  },
});
