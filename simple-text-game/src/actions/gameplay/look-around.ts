import { Action, ActionResult } from '../../action';

// !
// TODO should be searching for other beings seperate action?
// TODO or something else?
const livingBeingsLookup = ['who is here', 'who is in here', `who's here`, `who's in here`];
const placeNames = ['room', 'place', 'area', 'surrounding', 'space', 'chamber'];

export const lookAround = new Action({
  keyWords: [
    'look',
    'look around',
    'what is here',
    `what's here`,
    'what is in here',
    `what's in here`,
    'what else is here',
    'what do I see here',
    'what do I see in here',
    'what I see',
    'what I see here',
    'what I can see here',
    'what I can see in here',
    'what do I see',
    'what can I see',
    'what else I can see',
    'what else I can see here',
    'what else I can see in here',
    ...livingBeingsLookup,
    ...placeNames.map((name) => `search ${name}`),
    ...placeNames.map((name) => `search the ${name}`),
    // 'scout',
    // 'observe',
  ],

  run({ currentLocation, triggerWord }): ActionResult {
    if (livingBeingsLookup.includes(triggerWord)) {
      return {
        messages: `You see  ${currentLocation.getContentNamesAsStringList((c) =>
          c.filter((e) => e.isALivingBeing),
        )}`,
      };
    }

    return { messages: `You see ${currentLocation.getContentNamesAsStringList()}` };
  },
});
