import { LocationTemplate } from '../location';

export const cabin08Bathroom: LocationTemplate = {
  name: 'Cabin 08 Bathroom',
  description: [`Dummy bathroom description`],
  content: [
    [
      'bathroom door',
      {
        parent: 'door',
        enterLocation: ['Cabin 08', 'cabin', 'room'],
        keyWords: ['bathroom'],
      },
    ], //
    'metal sink',
  ],
};
