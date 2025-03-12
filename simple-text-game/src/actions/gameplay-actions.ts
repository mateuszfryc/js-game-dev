import { attack } from './gameplay/attack';
import { close } from './gameplay/close';
import { drop } from './gameplay/drop';
import { goTo } from './gameplay/go-to';
import { help } from './gameplay/help';
import { howTo } from './gameplay/how-to';
import { intercourse } from './gameplay/intercourse';
import { lookAround } from './gameplay/look-around';
import { showInventory } from './gameplay/show-inventory';
import { suicide } from './gameplay/suicide';
import { take } from './gameplay/take';
import { use } from './gameplay/use';
import { whereAmI } from './gameplay/where-am-i';
import { miscActions } from './global/misc';

export const gameplayActions = [
  suicide,
  close,
  goTo,
  howTo,
  help,
  attack,
  lookAround,
  use,
  whereAmI,
  showInventory,
  drop,
  intercourse,
  take,
  ...miscActions,
];
