import { LocationTemplate } from '../location';

export const cabin08: LocationTemplate = {
  name: 'Cabin 08',
  description: [
    `It is a small cabin for two crew members. It has bunk bed on the left wall, writting bureau mounted into the wall on the right and on the opposite wall to the entrance sink with backlith mirror and two tall lockers - as everything on this space station - also mounted to the wall.`,

    `It is a minimum space required for a person to function properly for few months on a space station. Crud, tight and with no decorations of any kind - if you don't count pipes and cables under the metal grille floor and on the ceiling.`,

    'Even though this space was planned for two the cabin belongs to you only. Apparently with rank comes privileges.',
  ],
  // randomContent('category') - add a chance for random stuff for this instance of room
  content: [
    [
      'cabin door',
      {
        parent: 'door',
        keyWords: ['cabin'],
        enterLocation: ['Main Corridor', 'corridor', 'main', 'highway'],
      },
    ],
    [
      'bathroom door',
      {
        parent: 'door',
        keyWords: ['bathroom'],
        enterLocation: ['Cabin 08 Bathroom', 'bathroom', 'toilet', 'restroom', 'lavatory'],
      },
    ],
    'window',
    'coms panel',
    'bunk bed',
    'brown rat',
    'mirror cabinet',
    ['wooden writting bureau', { content: ['pencil', 'pace of paper', 'paper notebook'] }],
    'metal sink',
    [2, 'metal locker'],
    [5, 'fly'],
  ],
};

/*z

'Distant sound of alarm sirens moves throught the station like massive wave. It is followed by the sound of strained metal parts, that wail over struggle to keep the ship in one piece. That is what wakes you up',

      `You've opened your eyes but it's still dark, except that - in a small space station cabin you find your self in - you see a red lights of emergency lamps flashing slowly over the room somewhere from under pipes and cables on the ceiling. In these short moments when red floods narrow space of the cabin you see your self lying on your right side in the back of the lower bunk mounted deep into the cabin wall. Intersecting shadows make all other objects difficult to recognize but you see dark shapes of some equipment lying on the flor - possibly the content of the now wide open lockers, which would explain annoing metalic sound that rigns out time and time after another like in some cheep horror movies. This also might meen that two book shelfs are also open and both your books and notes must by lying somewhere on the ground in the dark.`,

      `Much closer - right behind the door on the right - you hear sounds of agitated crew, that seems to be more irritated than scared`,

      'You fill dizzy and dehydrated. Like a hangover, but worst and with the addition of metalic taste of blood in your mounth',

      `You don't remember how you end up in here and why. Just the feeling that there was something you where supposed to do`,

      'You have learned eyes are still closed',

*/
