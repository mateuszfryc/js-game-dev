import { Action, ActionResult } from '../../action';
import { Message } from '../../types';
import { firstCharToCapital, formatInlineList } from '../../utils/text';
import { checkForDefaultTarget } from '../utils';

export const open = new Action({
  keyWords: ['open'],

  run(actionInput): ActionResult {
    const { triggerWord } = actionInput;
    const { target, error } = checkForDefaultTarget(actionInput);

    if (error) return { messages: error, dontPrintInput: true };

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
        )} is a living being, what do you mean open it?!`,
      };

    if (target.isOpen)
      return {
        isDone: true,
        target,
        messages: `The ${target.name} is already open`,
      };

    target.isOpen = true;

    const messages: Message[] = [];
    const actionUseResult: ActionResult = {};

    const contentNames = target.content
      ? formatInlineList(target.content.map((item) => item.name))
      : undefined;

    if (contentNames) {
      messages.push([
        `You open the ${target.name} and see ${contentNames}`,
        { className: 'green' },
      ]);
    } //
    else {
      messages.push(`You open the ${target.name} and see that it's empty`);
    }

    return { isDone: true, messages, target, ...actionUseResult };
  },
});
