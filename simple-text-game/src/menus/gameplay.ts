import { gameplayActions } from '../actions/gameplay-actions';
import { Menu } from '../menu';
import { SettingsValues } from '../settings';

export const gameplayMenu: Menu = {
  actions: gameplayActions,
  messages: [],
  useInputHistory: SettingsValues.useInputHistory.yes,
  showHints: true,
  showInput: true,
  showCallToAction: true,
  callToAction: 'What do you do?',
};
