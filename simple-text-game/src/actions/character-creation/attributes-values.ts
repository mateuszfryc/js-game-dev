import { Action, ActionResult } from '../../action';
import { whenFinishedTypeDone } from '../../content/messages';
import { Attributes } from '../../entity';
import { KEYS_CODES } from '../../enums';
import { Message } from '../../types';
import { get } from '../../utils/html';
import { clamp, randomInRange } from '../../utils/math';
import { attributesDescriptionSwitch } from './utils';

const maxPoints = 21;
let avilablePoints = 15;
let currentListItem = 0;

const attributesNamesByIndex = [
  'intelligence',
  'charisma',
  'dexterity',
  'strength',
  'constitution',
];

function updateAvilablePoints(newValue: number): void {
  const element = get(`.points`);
  if (element) element.innerHTML = element.innerHTML.replace(/\d{1,2}\//gi, `${newValue}/`);
}

function updateAttribute(index: number, value: number): number {
  const clampedValue = clamp(value, 8, 18);
  const element = get(`.list-${index}`);
  if (element) element.innerHTML = element.innerHTML.replace(/\d{1,2}/gi, `${clampedValue}`);

  return clampedValue;
}

function selectItemByIndex(newIndex: number): void {
  let listItem = get(`.list-${currentListItem}`);
  if (listItem) listItem.classList.remove('list-selected');
  currentListItem = clamp(newIndex, 0, 4);
  listItem = get(`.list-${currentListItem}`);
  if (listItem) listItem.classList.add('list-selected');
}

function updateAttributes(keyCode: number, attributes: Attributes): void {
  const attributeName = attributesNamesByIndex[currentListItem];
  const currentAttribute: number = attributes[attributeName];

  /* eslint-disable indent */
  switch (keyCode) {
    case KEYS_CODES.ARROW_UP:
      selectItemByIndex(currentListItem - 1);

      break;

    case KEYS_CODES.ARROW_DOWN:
      selectItemByIndex(currentListItem + 1);
      break;

    case KEYS_CODES.ARROW_LEFT:
      if (currentAttribute > 8) {
        attributes[attributeName] = updateAttribute(currentListItem, currentAttribute - 1);
        avilablePoints = avilablePoints + 1;
      }

      break;

    case KEYS_CODES.ARROW_RIGHT:
      if (currentAttribute < 18 && avilablePoints > 0) {
        attributes[attributeName] = updateAttribute(currentListItem, currentAttribute + 1);
        avilablePoints = avilablePoints - 1;
      }
      break;

    default:
      break;
  }
  /* eslint-enable indent */

  updateAvilablePoints(avilablePoints);
}

let onListKeyUp: ((event: KeyboardEvent) => void) | undefined = undefined;

export const attributesValues = new Action({
  run({ input, player }): ActionResult {
    const { attributes, skillPoints } = player;
    if (this.callsCount === 0) {
      onListKeyUp = (event: KeyboardEvent): void => updateAttributes(event.keyCode, attributes);
      document.addEventListener('keyup', onListKeyUp);
      avilablePoints = skillPoints;

      return {
        messages: [
          [
            `Attributes define base line of your character's skills`,
            { className: 'margin-bottom' },
          ],
          ['', { prefix: 'Assign points' }],
          `- single attribute can have value between 8 and 18`,
          `- you can use up to ${maxPoints} points`,
          [
            `if you want to speed this up type "throw the dice" to assigned points randomly.`,
            { prefix: 'Quick draw', className: 'margin-vertical' },
          ],
          [`use up and down arrows keys`, { prefix: 'To select attribute' }],
          [`use left and right arrows keys`, { prefix: 'To change value' }],
          [
            `Type the attribute name or abbreviation to learn more about it.`,
            { prefix: 'Learn more' },
          ],
          [
            `${skillPoints}/${maxPoints}`,
            { prefix: 'Points (avilable/max)', className: 'green margin-top points' },
          ],
          [
            `${attributes.intelligence}`,
            { prefix: 'Intelligence (int)', className: 'list-item list-0 list-selected' },
          ],
          [`${attributes.charisma}`, { prefix: 'Charisma (cha)', className: 'list-item list-1' }],
          [`${attributes.dexterity}`, { prefix: 'Dexterity (dex)', className: 'list-item list-2' }],
          [`${attributes.strength}`, { prefix: 'Strength (str)', className: 'list-item list-3' }],
          [
            `${attributes.constitution}`,
            { prefix: 'Constitution (con)', className: 'list-item list-4' },
          ],
          whenFinishedTypeDone,
        ],
        dontPrintInput: true,
      };
    }

    if (input === 'throw the dice') {
      avilablePoints = 21;
      [0, 1, 2, 3, 4].forEach((index) => (attributes[attributesNamesByIndex[index]] = 8));

      let index = 0;
      while (avilablePoints > 0) {
        index = randomInRange(0, 4);
        const attributeName = attributesNamesByIndex[index];
        if (attributes[attributeName] >= 18) continue;

        let result = randomInRange(1, Math.min(2, avilablePoints));
        avilablePoints -= result;
        attributes[attributeName] += avilablePoints < 0 ? (result = avilablePoints) : result;

        if (attributes[attributeName] >= 18) {
          const rest = attributes[attributeName] - 18;
          attributes[attributeName] -= rest;
          avilablePoints += rest;
        }
      }

      attributesNamesByIndex.forEach((name, nameIndex) => {
        updateAttribute(nameIndex, attributes[name]);
      });

      avilablePoints = 0;
      updateAvilablePoints(avilablePoints);

      return {
        dontPrintInput: true,
      };
    }

    const attributeDescription: Message = attributesDescriptionSwitch(input.toLowerCase());

    if (attributeDescription.length > 0)
      return {
        quickMessages: [attributeDescription],
        dontPrintInput: true,
      };

    if (input === 'done') {
      player.skillPoints = avilablePoints;
      if (onListKeyUp) document.removeEventListener('keyup', onListKeyUp);

      return {
        isDone: true,
        dontPrintInput: true,
        clearMessageLog: true,
      };
    }

    // In case player types anything else than attributes names
    // or their abbreviations, types nothing or something other
    // than "done" just clear the input
    return {
      dontPrintInput: true,
    };
  },
});
