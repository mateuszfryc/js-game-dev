import { Action, ActionResult } from '../../action';
import { MessageLoop } from '../../message-loop';
import { firstCharToCapital } from '../../utils/text';
import { checkForDefaultTarget } from '../utils';
import { open } from './open';

export const use = new Action({
  keyWords: [
    'use',
    'open', // locker, door, eyes
    'close',
    'pull',
    'press',
    'push',
    'read',

    'drink', // beer, water, tea

    'fill', // glass with water

    // jacket, boots, gown
    'wear',

    // light, machine
    'turn on',
    'turn off',

    'look up', // sky, ceiling

    'explore', // move this key word to another action

    // teeth
    'brush',

    'check',
    'look at', // take a look
    'take a look at',
    'take a closer look at',

    // look inside of something pocket, chest, container of kind
    'check',
    'inspect',
    'look into',
    'look in',
  ],

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
        )} is not a "thing", it's a living creature. You can't really use that, can you?`,
      };

    const { useBlocked } = target;
    if (useBlocked)
      return {
        isDone: true,
        target,
        messages: useBlocked instanceof MessageLoop ? useBlocked.next() : useBlocked,
      };

    /* eslint-disable indent */
    // prettier-ignore
    switch(triggerWord) {
      case 'open': return open.run(actionInput);
      default: break;
    }
    /* eslint-enable indent */

    // the first action is the default one
    const { defaultAction } = target;

    if (!defaultAction)
      return {
        isDone: true,
        target,
        messages: target.onUseText ?? `What do you mean to "use the ${target.name}"`,
      };

    return {
      isDone: true,
      target,
      blockingActions: [defaultAction],
    };
  },
});
