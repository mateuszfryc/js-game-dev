import { Action, ActionResult } from '../../action';
import { formatInlineList } from '../../utils/text';

// TODO 'You can't reach from from ${player.location}'

export const take = new Action({
  keyWords: [
    'pick up',
    'pick it up',

    // might also mean: take pill, stairs, right lane
    'take',

    'grab',
    'collect',
    'snatch',
    'get',
    'catch',
    'chasecat',
  ],

  run({
    triggerWord,
    potentialTargets,
    player,
    currentLocation,
    inputPhrases,
    previousTarget,
  }): ActionResult {
    // in case player just opened a storage and typed all or everything pick it all up
    const all = ['all', 'everything'];
    if (inputPhrases.some((p: string) => all.includes(p))) {
      if (previousTarget && previousTarget.isOpen && previousTarget.hasContent()) {
        const itemsNames: string[] = [];
        const removeList: number[] = [];
        previousTarget.content!.forEach((item) => {
          player.inventory.push(item);
          removeList.push(item.id);
          itemsNames.push(item.name);
        });

        removeList.forEach((id) => currentLocation.removeContentById(id));

        return {
          isDone: true,
          messages: [`You pick up ${formatInlineList(itemsNames)}`, { className: 'green' }],
        };
      }
    }

    let target = potentialTargets.length > 0 ? potentialTargets[0] : undefined;
    if (!target && previousTarget) target = previousTarget;

    if (!target)
      return {
        callToAction: `What do you want to ${triggerWord}?`,
        pendingState: {
          action: this,
          triggerWord,
        },
      };

    const { keyWords } = target;

    if (keyWords.includes('furniture'))
      return {
        isDone: true,
        target,
        messages: [
          `The ${target.name} is a furniture, you can't just ${triggerWord} it`,
          { className: 'red' },
        ],
      };

    if (keyWords.includes('structure'))
      return {
        isDone: true,
        target,
        messages: [
          `You can't ${triggerWord} the ${target.name}, it's to big!`,
          { className: 'red' },
        ],
      };

    if (target.isALivingBeing) {
      const [playerWon, messages] = player.testAttribute('dexterity', target);

      // ! catch action instead
      if (playerWon) {
        player.inventory.push(target);
        currentLocation.removeContentById(target.id);

        return {
          isDone: true,
          target,
          messages: [...messages, [`You caught the ${target.name}`, { className: 'green' }]],
        };
      }

      return {
        isDone: true,
        target,
        messages: [...messages, [`The ${target.name} got away!`, { className: 'red' }]],
      };
    }

    if (player.inventory.find((i) => i.id === target!.id))
      return {
        isDone: true,
        target,
        messages: `There is no ${
          inputPhrases.find((p) => target?.name.includes(p)) ?? 'item of that name'
        } that you can ${triggerWord}.`,
      };

    player.inventory.push(target);
    currentLocation.removeContentById(target.id);

    return {
      isDone: true,
      messages: [`You have picked up the ${target.name}`, { className: 'green' }],
      target,
    };
  },
});
