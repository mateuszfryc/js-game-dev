import { Action, ActionResult } from '../../action';
import { helpInstructions, typeBackToReturn } from '../../content/messages';

export const help = new Action({
  keyWords: [
    'help',
    'what to do',
    'how to',
    'how to play',
    'what can i do',
    'instructions',
    'what do i do',
    'what should i do',
    "don't know what to do",
    "i don't know what to do",
  ],

  run({ messageLog }): ActionResult {
    messageLog.clear();

    return {
      dontPrintInput: true,
      messages: [...helpInstructions, typeBackToReturn],
    };
  },
});
