import { Action, ActionResult } from '../../action';
import { continueAndClear } from '../misc/continue-and-clear';

export const sex = new Action({
  reactions: {
    firstCall: {
      messages: [
        'What is the biological sex of your character?',
        [`you can choose between "male" and "female"`, { prefix: 'Note' }],
      ],
    },
    emptyInput: {
      dontPrintInput: true,
    },
  },

  run({ player, input }): ActionResult {
    if (input !== 'male' && input !== 'female')
      return {
        quickMessages: 'You can choose between "male" and "female", remember?',
        dontPrintInput: true,
      };

    player.sex = input;

    return {
      blockingActions: [continueAndClear],
      dontPrintInput: true,
      isDone: true,
      messages: [[`Done. Your character is a ${input}`, { className: 'green' }]],
    };
  },
});
