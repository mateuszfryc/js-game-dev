import { Message } from '../types';

export const gameTitle = 'What happend to Periotheus?';

const orangeWithTopMargin = { className: 'orange margin-top' };
export const hitEnterToConinue: Message = ['Hit enter to continue', orangeWithTopMargin];
export const hitAnyKeyToConinue: Message = ['Hit any key to continue', orangeWithTopMargin];
export const typeBackToReturn: Message = [
  'Type "back" to return to previous menu',
  orangeWithTopMargin,
];
export const hitAnyKeyToClose: Message = ['Hit any key to close', orangeWithTopMargin];
export const whenFinishedTypeDone: Message = [
  'When finished type "done" and hit Enter to continue',
  orangeWithTopMargin,
];

export const intelligenceDescription = `affects all sort of things, including analysis, situational awareness, ability to focus, conversation skills, capacity to memorize. Helps in actions like search, find, examine or to lie more effectively`;

export const charismaDescription = `represents overall influence that the character can have over all living beings. It stems from the character's empathy, looks, manners, the ability to express one thoughts and social skills. Helps to gain trust more easly, to calm down the liveing being or to make cheeper purchases`;

export const dexterityDescription = `acts as the basis of all character's actions where being fast and agile is the key. Heavily affects stamina and will be crucial during the fight, dodging or running away from danger. Also applies to actions that require precision and balance`;

export const strengthDescription = `determines character's physical fitness, ability to punch, kick, pull, push and lift heavy objects. Adds additional damage to attacks with your side arms and natural attacks`;

export const constitutionDescription = `shapes the character's health, resistance to damage or stress or the amount of beating the character can endure. It also influences reaction to critical damage, pain, cold environment, fire etc.`;

export const firstScene = [
  'Distant sound of alarm sirens moves throught the space station like massive wave. It is followed by the sound of strained metal parts, that wail over the struggle under immense pressure.',

  'This helps you to regain your conscious state of mind.',

  `You are standing in front of the backlit mirror, leaning against the metal sink, shivering. The face you see in the mirror is tired, as if sleep was able to sneak pass its owner for quite some time, pale as the space dust, with tiny stream of blood flowing of the left nostril.`,

  `You don't remember how you end up in here and why. Just the feeling that there was something important you where supposed to do.`,
];

const headingsStyle = { className: 'blue margin-vertical' };
export const helpInstructions: Message[] = [
  ['Help', { className: 'margin-bottom size-hero' }],
  ['Welcome to Periotheus space station', headingsStyle],
  `"${gameTitle}"" is an adventure text game. Its world is described not with edge cutting 3D graphics but a text, much as paper printed book`,

  ['How to play?', headingsStyle],
  `You play this game by typing commands in response to description you see on the screen. You can think of it as of interactive book, where first you read portion of the text and than you can change the corse of the story by making your own decisions with commands`,

  ['What are commands?', headingsStyle],
  `They can be single words or simple expressions. They allow you to interact with the fictional world of the game and take the controll of its main protagonist. They may look like this:`,
  '[equipment]',
  '[take the spoon]',
  '[open the locker]',
  '[shoot the light bulb]',
  `Keep an eye for words in brackets, these are commands that can be typed and confirmed by hitting Enter. When typing the command you skip the brackets`,

  ['How to use commands?', headingsStyle],
  'To run a command you must type it and hit Enter on your keyboard. In response you will recive a description of the result of your action',
  'Some commands will require additional information. For example the command [open] needs to know what you want to open, so you could type "open the door" or "open the locker"',
  `Few of them will need more than one peace of information to work, like the command [hit] or [attack] that needs to know not only what is your target but also what do you want to attack with`,

  ['There is more than one way', headingsStyle],
  'A lot of commands have alternative forms. For example the attack command could be used like so: "attack the monster with fist".  Alternatively you could type "punch the monster" or "slap the monster". Same with weapons, instead of typing "attack the monster with pistol" you could type "shoot the monster". Items that your character will find could be picked up with the command [take] in few ways, for example: "take the spoon", "pick up the spoon", "grab the spoon" and few others',
  'Use the [commands] command to learn more',

  ['What commands are avilable?', headingsStyle],
  `To see the list of avilable commands use the command [commands], but mind that intentionally not all commands are listed. Those that are on the list act as base required to move around and interact with the game's world. Others you must discover on your own. Feel free to experiment`,
  `The game has a build in language interpreter that will try to make sens from what you type. Just remember it is not an AI, so it won't have philosophical disputes with you`,

  ['Example', headingsStyle],
  `Let us take the following description as an example:`,
  [
    '"You enter the hangar number three which now serves as a mess hall. It is made out of boxes, crates, storage shelfs and some quipment dragged here from other corners of the station. There are few people in here, mostly lower deck crew that just finished their shift and came here to have a drink or two or those who are about to start a new shift, also for a drink of two. The bartender is a young, short man behind small round table, that takes the orders right next to an airlock filled with crates and boxes with whatever this place has to offer. On the right there is a corridor leading to another hangar."',
    { className: 'orange' },
  ],
  'This description gives us some information of what we could interact with:',
  '- there is a bartender you could talk to, like so: bartender, what do you have in here worth ordering?',
  '- you could look for more details by typing command [look around] and than exaamine listed items with the command [examine]',
  `- you could take the corridor right and see what in there by typing: take corridor right`,
];
