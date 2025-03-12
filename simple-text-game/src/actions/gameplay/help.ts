import { Action, ActionResult } from '../../action';
import { helpInstructions } from '../../content/messages';

export const help = new Action({
  keyWords: [
    'help',
    'what to do?',
    'what can I do?',
    'what do I do?',
    'what should I do?',
    'how to play?',
    'instructions',
    'tutorial',
    "what's next",
    'what is next',
    'what comes next',
  ],

  run: (): ActionResult => ({
    dontPrintInput: true,
    quickMessages: helpInstructions,
  }),
});
