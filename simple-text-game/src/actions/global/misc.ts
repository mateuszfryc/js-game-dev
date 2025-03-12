import { Action, ActionResult, ActionTemplate } from '../../action';
import { pickRandomText } from '../../utils/text';

/**

  yell
  cry
  breathe
  pat (dog)
  scream

 */

const templates: ActionTemplate[] = [
  {
    keyWords: ['what is my name?', `what's my name?`],
    run: ({ player }): ActionResult => ({
      messages: `Your name is ${player.firstName} ${player.lastName}`,
    }),
  },
  {
    keyWords: ['who am I?'],
    run: ({ player }): ActionResult => ({ messages: player.identity }),
  },
  {
    keyWords: [
      'why am I here?',
      'what am I doing here?',
      'what am I doing in here?',
      'what is my purpose?',
      `what's my purpose?`,
    ],
    run: ({ player }): ActionResult => {
      console.log(player.purpose);

      return { messages: player.purpose };
    },
  },
  {
    keyWords: ['yell', 'scream', 'shout'],
    run: (): ActionResult => ({
      isDone: true,
      messages: pickRandomText(['AaaaAAaaAArrrRRR!', 'oooOOOOOaaaaAAAAAeeeEEEE!']),
    }),
  },
  {
    keyWords: ['fuck my self', 'fuck self', 'fuck me'],
    run: (): ActionResult => ({
      isDone: true,
      messages: 'It is not that type of a game, ok?',
    }),
  },
  {
    keyWords: ['nothing', 'none', 'nope', 'no', 'forget it', 'whatever'],
    run: (): ActionResult => ({
      isDone: true,
      messages: [pickRandomText(['Cool', 'Sure', 'Carry on', 'No worries', 'Yup', 'Yesss'])],
    }),
  },
  {
    keyWords: ['what do you know', 'fun fact', 'tell me fun facg', 'tell me something interesting'],
    run: (): ActionResult => ({
      messages: [
        pickRandomText([
          'Wombats are the only animal whose poop is cube-shaped',
          `Elephants can't jump`,
          `Walmart has a lower acceptance rate than Harvard`,
          `Lobsters communicate with their bladders`,
        ]),
      ],
    }),
  },
  {
    keyWords: ['what else'],
    run: (): ActionResult => ({
      messages: ['You tell me'],
    }),
  },
  {
    keyWords: ['really'],
    run: (): ActionResult => ({
      messages: ['Oh yes'],
    }),
  },
  {
    keyWords: ['seriously', 'are you serious', 'is this serious', 'is this for real', 'srsly'],
    run: (): ActionResult => ({
      messages: ['Always'],
    }),
  },
  {
    keyWords: ['shit', 'fucking shit', 'fuck this shit'],
    run: (): ActionResult => ({
      messages: ['Yeah, I know right?'],
    }),
  },
  {
    keyWords: ['fuck it', 'crap', 'well crap'],
    run: (): ActionResult => ({
      messages: ['Well, life is tought, right?'],
    }),
  },
  {
    keyWords: ['lol'],
    run: (): ActionResult => ({
      messages: [pickRandomText(['"lol" what?', 'lol indeed.'])],
    }),
  },
  {
    keyWords: ['gibberish', 'rubbish', 'nonsens'],
    run: (): ActionResult => ({
      isDone: true,
      messages: ['Obviously'],
    }),
  },
  {
    keyWords: ['shut up'],
    run: (): ActionResult => ({
      isDone: true,
      messages: ['Silent like a stone'],
    }),
  },
  {
    // ! these should be fired only after player gets feedback on someting, e.g. action they can't do
    // TODO run this only without CONTEXT
    keyWords: ['yeah', 'right', 'all right', 'all right then', 'you are right', 'fine', 'ok'],
    run: (): ActionResult => ({
      isDone: true,
      messages: ['There you go'],
    }),
  },
  {
    keyWords: ['fuck you', 'go fuck your self', 'fuck your self'],
    run: (): ActionResult => ({
      messages: [
        pickRandomText([
          'I would die laughing and you would die trying',
          'Can I at least get a kiss first?',
          `Don't threaten me with a good time`,
          'No thanks',
          'Buy me dinner first',
          `I don't do charity work`,
        ]),
      ],
    }),
  },
];

export const miscActions = templates.map((t) => new Action(t));
