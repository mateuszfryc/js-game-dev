import { EntityTemplate } from '../entity';

const base: EntityTemplate[] = [
  {
    name: 'metal sink',
    keyWords: [
      'sink',
      'plumbing',
      'fixture',
      'plumbing fixture',
      'sinker',
      'washbowl',
      'hand basin',
      'wash basin',
      'wash',
      'basin',
    ],
    damageModifiers: {
      fire: 40,
      blunt: 20,
      cold: -20,
      natural: -20,
      piercing: -50,
      slashing: -10,
    },
    hp: 6000,

    isOpen: false,
    content: ['rusty spoon', 'dirty towel'],
    onUseText: 'You use the sink to clean up your face and hands.',
  },
];

export const plumbing = base.map((f) =>
  !f.howToText
    ? { ...f, howToText: `Open it? Sit on it? How do you usually use this kind of furniture?` }
    : f,
);
