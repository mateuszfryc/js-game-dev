import { Action, ActionResult } from '../../action';
import { whenFinishedTypeDone } from '../../content/messages';
import { Player } from '../../player/player';
import { Messages } from '../../types';
import { continueAndClear } from '../misc/continue-and-clear';
import { age } from './age';
import { attributesValues } from './attributes-values';
import { firstName } from './first-name';
import { lastName } from './last-name';
import { sex } from './sex';

function makeSummary(player: Player): Messages {
  return [
    'This is what we now about your character so far:',
    [`${player.firstName} ${player.lastName}`, { prefix: 'Name' }],
    [`${player.age}`, { prefix: 'Age' }],
    [`${player.sex}`, { prefix: 'Sex' }],
    [`${player.attributes.intelligence}`, { prefix: 'Intelligence (int)' }],
    [`${player.attributes.charisma}`, { prefix: 'Charisma (cha)' }],
    [`${player.attributes.dexterity}`, { prefix: 'Dexterity (dex)' }],
    [`${player.attributes.strength}`, { prefix: 'Strength (str)' }],
    [`${player.attributes.constitution}`, { prefix: 'Constitution (con)' }],
    [
      `if you want to change any of the above type the name of the statistic, e.g "name" or "attributes" and hit Enter`,
      { prefix: 'Note', className: 'margin-top' },
    ],
    [
      `Once you compleate this step you won't be able to change any of it except when gaining level`,
      { className: 'red' },
    ],
    whenFinishedTypeDone,
  ];
}

export const summary = new Action({
  name: 'summary',

  run({ player, input, actions }): ActionResult {
    if (this.callsCount === 0) return { messages: makeSummary(player), dontPrintInput: true };

    let menusToPrepend: Action[] = [];

    /* eslint-disable indent */
    switch (input.toLowerCase()) {
      case 'name':
        menusToPrepend = [continueAndClear, lastName, continueAndClear, firstName];
        break;

      case 'last name':
        menusToPrepend = [continueAndClear, lastName];
        break;

      case 'first name':
        menusToPrepend = [continueAndClear, firstName];
        break;

      case 'age':
        menusToPrepend = [continueAndClear, age];
        break;

      case 'sex':
        menusToPrepend = [continueAndClear, sex];
        break;

      case 'intelligence':
      case 'int':
      case 'charisma':
      case 'cha':
      case 'dexterity':
      case 'dex':
      case 'strength':
      case 'str':
      case 'constitution':
      case 'con':
      case 'attributes':
        menusToPrepend = [attributesValues];
        break;

      default:
        break;
    }
    /* eslint-enable indent */

    if (menusToPrepend.length > 0) {
      this.callsCount = -1;
      menusToPrepend.forEach((action) => {
        action.callsCount = 0;
        actions.blocking.unshift(action);
      });

      return {
        dontPrintInput: true,
        clearMessageLog: true,
      };
    }

    if (input === '') return { dontPrintInput: true };

    return {
      // messages: [[`Done. Your character is a ${input}`, { className: 'green' }]],
      isDone: true,
      dontPrintInput: true,
    };
  },
});
