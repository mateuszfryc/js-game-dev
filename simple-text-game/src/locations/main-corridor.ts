import { LocationTemplate } from '../location';

export const mainCorridor: LocationTemplate = {
  name: 'Main Corridor',
  description: [
    `The Main Corridor takes long circle around the station. It's wide, alowing for massive shipment trucks to move side by side with no trouble. The floor is covered with thick metal plates, many of which can be opened to plunge into maze of technical canals that span the entire station.`,

    `It is probably the most lit area on the entire structure, as all the lamps on the fully covered white ceiling give light almost as strong as sun's. Corridor is full of crates, supplies of different sort stacked on it's sides. The walls as usual at the station are covered with multitude of pipes, cables, metal cabinets with all kinds of equipment, controll panels and coms stations scattered almost everywhere.`,
  ],
  content: [
    ['Cabin 08 door', { parent: 'door', keyWords: ['cabin 08'], enterLocation: ['Cabin 08'] }],
  ],
};

/*
Despite its strictly functional purpose the corridor has some design put into it. Cabinets, doors and walls where decorated with
*/
