import { Action, ActionResult } from '../../action';
import { typeBackToReturn } from '../../content/messages';
import { Message } from '../../types';
import { clearMessageLog, dontPrintInput, isDone } from '../result-state';
import { printMainMenu } from './main-menu';

function formSettingsPage(settingsAsMessages: Message[]): Message[] {
  return [
    ['Options', { className: 'size-hero margin-bottom', speed: 0 }],
    ...settingsAsMessages,
    [
      'To change option type its name and value you want to set, and hit Enter to confirm, for example:',
      { className: 'margin-top' },
    ],
    ['print speed instant', { className: 'margin-bottom red' }],

    typeBackToReturn,
  ];
}

export const settingsMenu = new Action({
  keyWords: ['settings'],

  run({ settings, input }): ActionResult {
    const visible = settings.getAllVisibleToPlayer();

    let inputHasNewSettings = false;
    visible.some((setting) =>
      Object.entries(setting.options).some(([name, value]) => {
        if (
          value !== setting.value &&
          input.toLowerCase() === `${setting.name.toLowerCase()} ${name}`
        ) {
          settings.setById(setting.id, value);
          inputHasNewSettings = true;

          return true;
        }

        return false;
      }),
    );

    if (this.callsCount === 0)
      return {
        blockingActions: [this],
        clearMessageLog,
        dontPrintInput,
        messages: formSettingsPage(settings.formSettingsAsMessages(true)),
      };

    if (inputHasNewSettings)
      return {
        clearMessageLog,
        dontPrintInput,
        messages: formSettingsPage(settings.formSettingsAsMessages(true)),
      };

    if (input === 'back')
      return {
        blockingActions: [printMainMenu],
        dontPrintInput,
        isDone,
      };

    return {
      dontPrintInput: true,
    };
  },
});
