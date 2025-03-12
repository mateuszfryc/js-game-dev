import { Action, ActionResult } from '../../../action';

export const again = new Action({
  keyWords: ['again', 'do it again', 'one more time', 'repeat', 'repeat that'],

  run(): ActionResult {
    // equip can also take into account items lying around
    // const {curretLevel} = game;

    return {};
  },
});
