import { Action, ActionResult } from '../../action';
import { formatInlineList } from '../../utils/text';

export const showInventory = new Action({
  keyWords: [
    'what I have?',
    'what do I have?',
    `what is in my pockests?`,
    `what's in my pockests?`,
    'my pockets',
    'show pockets',
    'show inventory',
    'my inventory',
    'inventory',
    'my stuff',
  ],
  run({ player }): ActionResult {
    const itemsList = formatInlineList(player.inventory.map((item) => item.name));

    return {
      messages: `You have ${itemsList || 'nothing on you'}`,
    };
  },
});
