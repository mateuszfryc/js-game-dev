// this.print('Type start and hit Enter on your keyboard to begin');

import { Action, ActionResult } from '../../action';
import { characterCreationMenu } from '../../menus/character-creation';

export const start = new Action({
  keyWords: ['start'],

  run(): ActionResult {
    return { dontPrintInput: true, goToMenu: characterCreationMenu };
  },
});
