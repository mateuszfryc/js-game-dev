import { Action, ActionResult } from '../action';
import { clearMessageLog, dontPrintInput, isDone } from '../actions/result-state';
import { hitEnterToConinue } from '../content/messages';
import { Menu } from '../menu';
import { SettingsValues } from '../settings';
import { mainMenu } from './main-menu';

const introAction = new Action({
  reactions: {
    firstCall: {
      messages: hitEnterToConinue,
    },
  },

  run(): ActionResult {
    return {
      dontPrintInput,
      isDone,
      clearMessageLog,
      goToMenu: mainMenu,
    };
  },
});

export const introMenu: Menu = {
  unknownActionResponse: SettingsValues.unknownActionResponse.skip,
  actions: [],
  messages: [
    [
      'What happend to&nbsp;Periotheus?',
      { className: 'size-hero margin-bottom', speed: [100, 400] },
    ],
  ],
  blockingActions: [introAction],
};
