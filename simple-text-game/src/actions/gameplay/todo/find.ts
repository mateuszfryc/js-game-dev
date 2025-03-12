import { Action, ActionResult } from '../../../action';

export const find = new Action({
  keyWords: ['search', 'find', 'where is', 'look under'],

  run(): ActionResult {
    // equip can also take into account items lying around
    // const {curretLevel} = game;

    return {};
  },
});
