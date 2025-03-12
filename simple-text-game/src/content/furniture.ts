import { EntityTemplate } from '../entity';

const base: EntityTemplate[] = [
  {
    name: 'metal locker',
    keyWords: ['furniture', 'storage', 'metal', 'locker'],
    damageModifiers: {
      fire: 40,
      blunt: 20,
      cold: -20,
      natural: -20,
      piercing: -50,
      slashing: -10,
    },
    hp: 6000,

    defaultAction: 'open',
    isOpen: false,
    content: ['rusty spoon', 'dirty towel'],
  },

  {
    name: 'bunk bed',
    keyWords: ['furniture', 'storage', 'bunk', 'bed'],

    defaultAction: 'open',
    isOpen: false,
    content: ['pillow', 'duvet'],
  },

  {
    name: 'mirror cabinet',
    keyWords: ['furniture', 'storage', 'mirror', 'cabinet'],

    defaultAction: 'open',
    isOpen: false,
    content: ['rusty spoon', 'dirty towel'],
  },

  {
    name: 'wooden writting bureau',
    keyWords: ['furniture', 'storage', 'writting bureau', 'bureau'],

    defaultAction: 'look in',
    isOpen: false,
  },
];

export const furniture = base.map((f) =>
  !f.howToText
    ? { ...f, howToText: `Open it? Sit on it? How do you usually use this kind of furniture?` }
    : f,
);
