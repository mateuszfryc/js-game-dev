import { Action, ActionResult } from '../../action';
import { Messages } from '../../types';
import { continueAndClear } from '../misc/continue-and-clear';

export const lastName = new Action({
  name: 'set last name',
  reactions: {
    firstCall: {
      dontPrintInput: true,
      messages: [
        'What should be the last name of your character?',
        ['Consider the same restrictions as with the first name', { prefix: 'Note' }],
      ],
    },
    // dimmOlderMessages: true,
    emptyInput: {
      dontPrintInput: true,
    },
  },

  run({ player, input }): ActionResult {
    player.lastName = input;

    const messages: Messages = [
      [
        `Your character will be known as "${player.firstName} ${player.lastName}"`,
        { className: 'green' },
      ],
    ];
    if (input.length === 1) messages.unshift('Bold move!');

    return {
      messages,
      blockingActions: [continueAndClear],
      isDone: true,
      dontPrintInput: true,
    };
  },
});
