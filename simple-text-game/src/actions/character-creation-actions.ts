import { age } from './character-creation/age';
import { attributesValues } from './character-creation/attributes-values';
import { firstName } from './character-creation/first-name';
import { lastName } from './character-creation/last-name';
import { loadingJoke } from './character-creation/loading-joke';
import { sex } from './character-creation/sex';
import { summary } from './character-creation/summary';

export const characterCreationActions = [
  firstName,
  lastName,
  age,
  sex,
  attributesValues,
  summary,
  loadingJoke,
];
