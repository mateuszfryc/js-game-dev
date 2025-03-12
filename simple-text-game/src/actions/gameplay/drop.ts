import { Action, ActionResult } from '../../action';

export const drop = new Action({
  keyWords: ['drop', 'remove', 'despose', 'throw away', 'release', 'put down'],

  run({ inputPhrases, player, triggerWord, currentLocation, previousTarget }): ActionResult {
    const { inventory } = player;

    if (inventory.length === 0)
      return {
        isDone: true,
        messages: `You have nothing on you that you could ${triggerWord}`,
      };

    let target = inventory.find((i) => i.keyWords.some((k) => inputPhrases.includes(k)));
    if (!target && previousTarget && inventory.some((i) => i.id === previousTarget.id))
      target = previousTarget;

    if (!target)
      return {
        pendingState: {
          action: this,
          triggerWord,
        },
        callToAction: 'What do you want to drop?',
      };

    if (!target.isALivingBeing && triggerWord === 'release')
      return {
        target,
        pendingState: {
          action: this,
          triggerWord,
        },
        messages: `You can't release the ${target.name}, it's not a sea whale. Just drop it on the floor`,
      };

    player.drop(target.id);
    currentLocation.content.push(target);

    return {
      target,
      isDone: true,
      messages: target.isALivingBeing
        ? `You have released the ${target.name}`
        : `You have dropped ${target.name} on the floor`,
    };
  },
});
