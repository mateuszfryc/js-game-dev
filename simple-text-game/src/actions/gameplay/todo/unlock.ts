import { Action, ActionResult } from '../../../action';

export const unlock = new Action({
  keyWords: ['lock', 'unlock'],

  run(): ActionResult {
    // equip can also take into account items lying around
    // const {curretLevel} = game;

    return {};
  },
});
