import { EntityTemplate } from '../entity';

const base: EntityTemplate[] = [
  {
    name: 'linen socks',
    keyWords: ['clothes', 'socks'],
    damageType: 'none',
    hp: 0,
    defaultAction: 'wear',
  },
  {
    name: 'leather shoes',
    keyWords: ['clothes', 'shoe', 'shoes', 'boot', 'boots'],
    damage: 35,
    damageType: 'blunt',
    isPlural: true,
    hp: 0,
    defaultAction: 'wear',
    howToText: 'You can put them on or kick something.',
  },
];

export const clothing = base.map((c) =>
  !c.howToText ? { ...c, howToText: 'Put it on? What else you could do?' } : c,
);
