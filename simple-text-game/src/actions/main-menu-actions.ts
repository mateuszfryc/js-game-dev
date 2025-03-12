import { hintsSwitch } from './global/hints-switch';
import { printMainMenu } from './main-menu/main-menu';
import { help } from './main-menu/help';
import { load } from './main-menu/load';
import { settingsMenu } from './main-menu/settings';
import { start } from './main-menu/start';

export const menuActions = [start, help, load, settingsMenu, hintsSwitch, printMainMenu];
