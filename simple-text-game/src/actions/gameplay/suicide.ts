import { Action, ActionResult } from '../../action';
import { pickRandomText } from '../../utils/text';

export const suicide = new Action({
  keyWords: [
    'I kill myself',
    'I kill my self',
    'kill myself',
    'kill my self',
    'kill me',
    'commit suicide',
    'kill self',
  ],

  run({ player }): ActionResult {
    player.hp = 0;

    return {
      messages: pickRandomText([
        'You stabbed your left foot brutally with your own finger. The blood was flowing endlesly and eventually you died out of boredom.',

        'You take your shoe off and start hitting your self with it. At some point someone sees this and decides to end your misery for the sake of society that has to feed you. He also took all of your credits. And the shoe.',
      ]),
    };
  },
});
