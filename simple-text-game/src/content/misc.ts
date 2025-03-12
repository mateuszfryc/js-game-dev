import { ActionInput } from '../action';
import { EntityTemplate } from '../entity';

// lockpick?
// lighter
// flashlight

export const misc: EntityTemplate[] = [
  {
    name: 'rusty spoon',
    keyWords: ['cuttlery', 'weapon', 'spoon'],
    damageType: 'blunt',
    howToText: `It's a spoon god damn it, have you droped out of kindergarden?`,
    onUseText: `How?`,

    attackResponse({ player, currentLocation }: ActionInput): string {
      this.keyWords.push('bent');
      let text = `The spoon bounces several times and falls on the floor`;
      if (this.name !== `bent rusty spoon`) {
        text += `. It's bend now`;
      }
      this.name = `bent rusty spoon`;
      player.drop(this.id);
      currentLocation.content.push(this);

      return text;
    },
  },

  {
    name: 'dirty towel',
    keyWords: ['towel'],
    damageType: 'none',
    howToText: `If you plan space travel it's a neccessity, that's for sure.`,
    onUseText: `Using that without putting it into washing machine it first doesn't make any sens`,

    attackResponse({ triggerWord, player, currentLocation }: ActionInput): string {
      player.drop(this.id);
      currentLocation.content.push(this);

      return `You ${triggerWord} the towel with all you have. Odly nothing happens`;
    },
  },

  {
    name: 'pillow',
    keyWords: ['bedclothes', 'pillow'],
  },

  {
    name: 'duvet',
    keyWords: ['bedclothes'],
  },

  {
    name: 'pencil',
    keyWords: [],
  },

  {
    name: 'pace of paper',
    keyWords: ['paper'],
  },

  {
    name: 'paper notebook',
    keyWords: ['paper', 'notebook'],
    defaultAction: 'open',
    isOpen: false,
  },
];
