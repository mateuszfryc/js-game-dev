import { Action, ActionResult } from '../../action';
import { Messages } from '../../types';
import { continueAndClear } from '../misc/continue-and-clear';

export const firstName = new Action({
  name: 'set first name',
  reactions: {
    firstCall: {
      dontPrintInput: true,
      messages: [
        'What will be the first name of your character?',
        [
          'Long names can make some of printed messages less readable. Though they also might have an interesting effect',
          { prefix: 'Note' },
        ],
        [
          `you won't be able to change the first name once your character is created`,
          { prefix: 'Note' },
        ],
      ],
    },
    emptyInput: {
      dontPrintInput: true,
    },
  },

  run({ player, input }): ActionResult {
    player.firstName = input;

    const messages: Messages = [
      [`Your character's first name is "${input}"`, { className: 'green' }],
    ];
    if (input.length === 1) messages.unshift('What an expression!');

    return {
      blockingActions: [continueAndClear],
      dontPrintInput: true,
      isDone: true,
      messages,
    };
  },
});
