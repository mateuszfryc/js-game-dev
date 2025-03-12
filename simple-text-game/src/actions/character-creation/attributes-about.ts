import { Action, ActionResult } from '../../action';
import { whenFinishedTypeDone } from '../../content/messages';
import { Message, Messages } from '../../types';
import { attributesDescriptionSwitch } from './utils';

const text: Messages = [
  `Your character's ability to deal with any circumstances is based on attributes.`,
  'There is five of them:',
  [`(int) `, { prefix: 'Intelligence' }],
  [`(cha)`, { prefix: 'Charisma' }],
  [`(dex)`, { prefix: 'Dexterity' }],
  [`(str)`, { prefix: 'Strength' }],
  [`(con)`, { prefix: 'Constitution' }],
  [
    `type the attribute name or abbreviation to read more about it.`,
    { prefix: 'Learn more', className: 'margin-top' },
  ],
  whenFinishedTypeDone,
];

export const attributesAbout = new Action({
  reactions: {
    firstCall: {
      messages: text,
      dontPrintInput: true,
    },
  },

  run({ input }): ActionResult {
    if (input === 'done')
      return {
        isDone: true,
        dontPrintInput: true,
        // clearMessageLog: true,
      };

    const lowerCaseInput = input.toLowerCase();
    const attributeDescription: Message = attributesDescriptionSwitch(lowerCaseInput);

    if (attributeDescription.length > 0)
      return {
        quickMessages: [attributeDescription],
        dontPrintInput: true,
      };

    // In case player types anything else than attributes names
    // or their abbreviations, types nothing or s something other
    // than "done" just clear the input
    return {
      dontPrintInput: true,
    };
  },
});
