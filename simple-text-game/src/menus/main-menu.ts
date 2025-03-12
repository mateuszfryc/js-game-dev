import { menuActions } from '../actions/main-menu-actions';
import { printMainMenu } from '../actions/main-menu/main-menu';
import { Menu } from '../menu';
import { SettingsValues } from '../settings';

export const mainMenu: Menu = {
  showHints: true,
  showInput: true,
  unknownActionResponse: SettingsValues.unknownActionResponse.printInModal,
  actions: menuActions,
  blockingActions: [printMainMenu],
};
