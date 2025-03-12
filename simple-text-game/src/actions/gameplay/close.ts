import { Action, ActionResult } from '../../action';
import { firstCharToCapital } from '../../utils/text';
import { checkForDefaultTarget } from '../utils';

export const close = new Action({
  keyWords: ['close', 'shut'],

  run(actionInput): ActionResult {
    const { triggerWord } = actionInput;
    const { target, error } = checkForDefaultTarget(actionInput);

    if (error) return { messages: error };

    if (!target) {
      return {
        pendingState: {
          action: this,
          input: '',
          triggerWord,
        },
        callToAction: `What do you want to ${triggerWord}?`,
      };
    }

    if (target.isALivingBeing)
      return {
        isDone: true,
        target,
        messages: `${firstCharToCapital(
          target.name,
        )} is a living being, what do you mean ${triggerWord} it?!`,
      };

    if (!target.isOpen)
      return {
        isDone: true,
        target,
        messages: `The ${target.name} is already ${triggerWord}.`,
      };

    target.isOpen = false;

    return {
      isDone: true,
      messages: `You ${triggerWord} the ${target.name}.`,
      target,
    };
  },
});
