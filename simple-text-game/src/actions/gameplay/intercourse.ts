import { pickRandomText } from '../../utils/text';
import { Action, ActionResult } from '../../action';

export const intercourse = new Action({
  keyWords: [
    'fuck the',
    'have sex with',
    'make love to',
    'copulate with',
    'breed with',
    'fornicate with',
    'go to bed with',
    'make out with',
    'sleep with',
    'mate with',
  ],

  run({ potentialTargets }): ActionResult {
    if (potentialTargets.length > 0) {
      if (potentialTargets.every((target) => target.isDead()))
        return {
          messages: pickRandomText([
            `It's not that type of game...`,
            'To the corpse, really?',
            'Find a shrink',
            'Why would any one...',
            'For the love of...',
            'Stop it',
            'Nope',
            'Not going to happen',
          ]),
        };

      const target = potentialTargets[0];

      return {
        target,
        messages: pickRandomText([
          `The ${target.name} doesn't seems to be interested`,
          'You would have no chance to score',
          'As if you knew what that even means',
          'And how do you imagine it?',
          'You should prabobly consider taking a long walk',
        ]),
      };
    }

    return { messages: 'Who?' };
  },
});
