import { Action, ActionResult } from '../../action';
import { firstScene, hitAnyKeyToConinue } from '../../content/messages';
import { gameplayMenu } from '../../menus/gameplay';
import { SettingsValues } from '../../settings';

let isLoading = true;
let previousPrintSpeed: number = SettingsValues.printSpeed.normal;

export const loadingJoke = new Action({
  name: 'loading joke',

  run({ messageLog, settings }): ActionResult {
    if (this.callsCount === 0) {
      previousPrintSpeed = settings.printSpeed.get();
      settings.printSpeed.set(SettingsValues.printSpeed.slow);
      messageLog.printAllPendingMessages();
      messageLog.clear();
      messageLog.print([
        'Loading...',
        ['||||||||||||||||||||||||||||||||||||||||||||||||||||||', { speed: [100, 500] }],
      ]);

      setTimeout(() => {
        isLoading = false;
        settings.printSpeed.set(previousPrintSpeed);
        messageLog.printAllPendingMessages();
        messageLog.clear();
        messageLog.print([
          'Kidding!',
          'This is a text game, everything can be loaded instantly',
          hitAnyKeyToConinue,
        ]);
      }, 4000);

      return {
        dontPrintInput: true,
      };
    }

    if (isLoading) return { dontPrintInput: true };

    return {
      isDone: true,
      dontPrintInput: true,
      goToMenu: gameplayMenu,
      enterLocation: 'Cabin 08',
      showEnterLocationInfo: false,
      showLocationDescription: false,
      messages: firstScene,
    };
  },
});
