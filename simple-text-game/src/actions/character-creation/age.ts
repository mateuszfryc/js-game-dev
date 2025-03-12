import { MessageLoop } from '../../message-loop';
import { Action, ActionResult } from '../../action';
import { continueAndClear } from '../misc/continue-and-clear';

const notNumbersResponse = new MessageLoop([
  'You know that age is commonly represented by numbers, right?',
  'Numbers, age is desribed by numbers!',
  `That's sad...`,
]);

const toHighAgeResponse = new MessageLoop([
  `People of this age have either given up their adventures in space or joined the ranks of geriatric troops in slippers. Either way nope`,
  'Not a grandma simulator',
  'Dinosaurs do not fly in space!',
]);

const toLowAgeResponse = new MessageLoop([
  `Space is not a place for young and inexperienced, character needs to be at least 20`,
  ['NOT FOR KIDS!', { speed: 300 }],
  'Have a biscuit',
]);

export const age = new Action({
  name: 'set age',
  reactions: {
    firstCall: {
      dontPrintInput: true,
      messages: [
        'How old the character is?',
        [`Character's age can have influence on the game`, { prefix: 'Note' }],
        ['The age should be between 20 and 60', { prefix: 'Restriction', className: 'red' }],
      ],
    },
    emptyInput: {
      dontPrintInput: true,
    },
  },

  run({ player, input }): ActionResult {
    const numbers = input.match(/\d+/gim);
    const notNumbers = input.match(/[^\d]/gim);
    const characterAge = parseInt(input);

    if (numbers === null || notNumbers !== null || isNaN(characterAge)) {
      return {
        quickMessages: [notNumbersResponse.next()],
        dontPrintInput: true,
      };
    }

    if (characterAge < 20)
      return {
        quickMessages: [toLowAgeResponse.next()],
        dontPrintInput: true,
      };

    if (characterAge > 60)
      return {
        quickMessages: [toHighAgeResponse.next()],
        dontPrintInput: true,
      };

    player.age = characterAge;

    return {
      blockingActions: [continueAndClear],
      dontPrintInput: true,
      isDone: true,
      messages: [[`Your character's age is ${player.age}`, { className: 'green' }]],
    };
  },
});
