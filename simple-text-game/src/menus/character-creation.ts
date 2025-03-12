import { characterCreationActions } from '../actions/character-creation-actions';
import { Menu } from '../menu';

export const characterCreationMenu: Menu = {
  showHints: true,
  showInput: true,
  actions: [],
  messages: [`First let's create a character that you are going to play. Ready?`],
  blockingActions: characterCreationActions,
};
