import { EntityTemplate } from '../entity';
import { MessageLoop } from '../message-loop';

export const structures: EntityTemplate[] = [
  {
    name: 'door',
    hp: 5000,
    keyWords: ['structure', 'exit', 'door'],
    damageModifiers: {
      blunt: -550,
      cold: -500,
      natural: -1200,
      piercing: -620,
      slashing: -490,
    },
    defaultAction: 'go to',
    isPlural: true,
    isOpen: false,
    isLocked: false,
    howToText: 'Try openning it, see what happens',
    // damageModifiers: {
    //     blunt: -550,
    //     cold: -500,
    //     natural: -1200,
    //     piercing: -620,
    //     slashing: -490,
    //   },
    // useBlocked: `This heavy door cannot be opened on your side`,
  },

  {
    name: 'window',
    keyWords: ['structure', 'exit'],
    hp: 6000,
    isOpen: false,
    isLocked: false,
    defaultAction: 'open',
    useBlocked: new MessageLoop([
      `It's a window on a space station, you can't open it, now can you?`,
      `I wouldn't risk that on a space station.`,
      'Now why would you do that in space?',
      `You are a persistent one, aren't you?`,
    ]),
  },
];
