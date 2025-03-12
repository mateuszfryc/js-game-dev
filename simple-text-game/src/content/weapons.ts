import { EntityTemplate } from '../entity';

export const weapons: EntityTemplate[] = [
  {
    name: 'iron axe',
    keyWords: ['axe', 'weapon', 'tool'],
    damage: 300,
    damageType: 'slashing',
  },

  {
    name: 'head',
    keyWords: ['body', 'weapon'],
    damage: 10,
    damageType: 'natural',
    howToText: `You've never really done that, right?`,
  },

  {
    name: 'fist',
    keyWords: ['fists', 'body', 'weapon'],
    damage: 5,
    damageType: 'natural',
    howToText: `Works best on someone's nose`,
  },

  {
    name: 'hand',
    keyWords: ['hands', 'body', 'weapon'],
    damage: 5,
    damageType: 'natural',
    howToText: `It's your most universal multitool. I'm sure you'll figure out something`,
  },

  {
    name: 'foot',
    keyWords: ['feet', 'leg', 'legs', 'body', 'weapon'],
    damage: 15,
    damageType: 'natural',
    howToText: 'If you rub it might tickle',
  },
];
