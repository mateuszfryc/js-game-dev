import { Action, ActionResult } from '../../action';
import { firstCharToCapital } from '../../utils/text';

export const howTo = new Action({
  keyWords: [
    'how to use',
    'what can I do with',
    'what is the purpose of',
    `what's the purpose of`,
    'what to do with',
  ],

  run({ potentialTargets, triggerWord }): ActionResult {
    const target = potentialTargets.length > 0 ? potentialTargets[0] : undefined;

    if (!target)
      return {
        pendingState: {
          action: this,
          triggerWord,
        },
        callToAction: `${firstCharToCapital(triggerWord)} what?`,
      };

    return {
      isDone: true,
      messages: target.howToText,
    };
  },
});
