import { Action, ActionResult } from '../../../action';

export const equip = new Action({
  keyWords: ['equip'],

  run(): ActionResult {
    // equip can also take into account items lying around
    // const {curretLevel} = game;

    return {};
  },
});
