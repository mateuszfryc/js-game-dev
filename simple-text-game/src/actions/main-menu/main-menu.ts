import { Action, ActionResult } from '../../action';
import { dontPrintInput, isDone, clearMessageLog } from '../result-state';

export const printMainMenu = new Action({
  keyWords: ['back', 'main menu'],

  run(): ActionResult {
    return {
      clearMessageLog,
      dontPrintInput,
      isDone,
      messages: [
        ['What happend to&nbsp;Periotheus?', { className: 'size-hero', speed: 0 }],
        [
          'Type one of the following commands and hit Enter on your keyboard:',
          { className: 'margin-vertical' },
        ],
        ['to begin new game', { prefix: 'start' }],
        ['to learn how to play', { prefix: 'help' }],
        ['to load saved game state', { prefix: 'load' }],
        ['to see what you can adjust', { prefix: 'settings' }],
      ],
    };
  },
});
