import { Action, ActionResult } from '../../action';
import { findOryginalStrings } from '../../utils/misc';
import { findStringsOverlaps } from '../../utils/text';

// ! go back - previous location (if possible)
// ! go back to [name] go back to another location if possible an no events are scheduled at any location on the way

function noExitsError(locationName: string): void {
  throw new Error(
    `Current location [${locationName}] has no exits, there should be no locations in game that don't have at least one exit.`,
  );
}

export const goTo = new Action({
  keyWords: ['go to', 'enter'],

  run({ input, inputPhrases, currentLocation }): ActionResult {
    // console.log('input phrases: ', inputPhrases);

    // these have valid enterLocation prop, use enterLocation!
    const doors = currentLocation.getExits();

    if (!doors || doors.length === 0) {
      noExitsError(currentLocation.name);

      return {};
    }

    if (doors.length === 1) {
      const { enterLocation } = doors[0];

      const [locationName, ...locationKeyWords] = enterLocation!;
      const nameLowercase = locationName.toLowerCase();

      if (inputPhrases.find((p) => nameLowercase.includes(p)) || input.includes(nameLowercase))
        return {
          isDone: true,
          enterLocation: locationName,
        };

      if (
        locationKeyWords &&
        locationKeyWords.length > 0 &&
        findStringsOverlaps(locationKeyWords, inputPhrases)
      )
        return {
          isDone: true,
          enterLocation: locationName,
        };

      return {
        isDone: true,
        messages: `There is no way to get there from here. Maybe you meant another place?`,
      };
    }

    const originalKeyWords = findOryginalStrings(doors?.map((d) => d.enterLocation!).flat());
    const locationKeys = inputPhrases.filter((p) => originalKeyWords.includes(p));

    if (locationKeys.length === 0) {
      noExitsError(currentLocation.name);

      return {};
    }

    if (locationKeys.length > 1) throw new Error('Implement multiple choice');

    const avilableLocations = doors.map((d) => d.enterLocation![0]);

    if (!avilableLocations) {
      noExitsError(currentLocation.name);

      return {};
    }

    const [key] = locationKeys;
    const enterLocation = avilableLocations.find((name) => name.toLowerCase().includes(key));
    if (!enterLocation) {
      noExitsError(currentLocation.name);

      return {};
    }

    console.log('end');

    return {
      isDone: true,
      enterLocation,
    };
  },
});
