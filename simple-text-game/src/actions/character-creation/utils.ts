import { Message } from '../../types';

export function attributesDescriptionSwitch(lowerCaseInput: string): Message {
  let message: Message = '';

  /* eslint-disable indent */
  switch (lowerCaseInput) {
    case 'int':
    case 'intelligence':
      message = [
        `affects all sort of things, including analysis, situational awareness, ability to focus, conversation skills, capacity to memorize. Helps in actions like search, find, examine or to lie more effectively.`,
        { prefix: 'Intelligence' },
      ];
      break;

    case 'cha':
    case 'charisma':
      message = [
        `represents overall influence that the character can have over all living beings. It stems from the character's empathy, looks, manners, the ability to express one thoughts and social skills. Helps to gain trust more easly, to calm down the liveing being or to make cheeper purchases.`,
        { prefix: 'Charisma' },
      ];
      break;

    case 'dex':
    case 'dexterity':
      message = [
        `acts as the basis of all character's actions where being fast and agile is the key. Heavily affects stamina and will be crucial during the fight, dodging or running away from danger. Also applies to actions that require precision and balance.`,
        { prefix: 'Dexterity' },
      ];
      break;

    case 'str':
    case 'strength':
      message = [
        `determines character's physical fitness, ability to punch, kick, pull, push and lift heavy objects. Adds additional damage to attacks with your side arms and natural attacks.`,
        { prefix: 'Strength' },
      ];
      break;

    case 'con':
    case 'constitution':
      message = [
        `shapes the character's health, resistance to damage or stress or the amount of beating the character can endure. It also influences reaction to critical damage, pain, cold environment, fire etc.`,
        { prefix: 'Constitution' },
      ];
      break;

    default:
      break;
  }
  /* eslint-enable indent */

  return message;
}
