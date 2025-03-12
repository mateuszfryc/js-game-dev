import { EntityTemplate } from '../entity';

export const base: EntityTemplate[] = [
  {
    name: 'fly',
    keyWords: ['animal', 'fly'],
    hp: 1,
    isALivingBeing: true,
    attributes: {
      intelligence: 10,
      charisma: 10,
      dexterity: 14,
      strength: 10,
      constitution: 10,
    },
  },
  {
    name: 'brown rat',
    keyWords: ['animal', 'rodent', 'rat'],
    hp: 20,
    isALivingBeing: true,
    attributes: {
      intelligence: 10,
      charisma: 10,
      dexterity: 6,
      strength: 10,
      constitution: 10,
    },
    damage: 3,
    damageType: 'natural',
  },
];

export const creatures = base.map((c) =>
  !c.howToText ? { ...c, howToText: `You can try catching or feeding it. Maybe pet it?` } : c,
);
