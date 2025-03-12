import { Action, ActionResult } from '../../action';
import { spaceStationDescriptions } from '../../content/explorable';
import { messageToSingleString } from '../../utils/messages';
import { firstCharToCapital } from '../../utils/text';

export const whereAmI = new Action({
  keyWords: [
    'where am I',
    'where the fuck am I',
    'where the hell am I',
    'where the hell am I',
    'where the fuck am I',
    'where is this',
    'where the hell is this',
    'where the fuck is this',
    "what's this place",
    'what is this place',
    'what is this',
  ],

  run({ currentLocation }): ActionResult {
    return {
      messages: [
        spaceStationDescriptions.get(),
        `Your current location is ${firstCharToCapital(
          currentLocation.name,
        )}. ${messageToSingleString(currentLocation.description)}`,
      ],
    };
  },
});
