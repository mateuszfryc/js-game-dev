import pluralize from 'pluralize';
import { Action, ActionResult } from '../../action';
import { Message } from '../../types';
import { firstCharToCapital, pickRandomText } from '../../utils/text';

// TODO stwórz status akcji : zakończona, wymaga więcej informacji, odrzucona
// ! multiple possible targets

const naturalAttacks = ['punch', 'kick', 'front-kick', 'front kick', 'frontkick', 'slap', 'choke'];
const attacksAgainstLivingCreatures = ['choke', 'kill'];

export const attack = new Action({
  keyWords: [
    'attack',
    'hit',
    'slam',
    'charge',
    'strike',
    'smite',
    'smash',
    'bang',
    'gut',
    ...naturalAttacks,
    ...attacksAgainstLivingCreatures,
  ],

  run(input): ActionResult {
    const { inputPhrases, triggerWord, player, potentialTargets } = input;
    const target = potentialTargets.find(
      (t) => (!t.isDead() || !t.isALivingBeing) && t.keyWords.some((k) => inputPhrases.includes(k)),
    );

    if (!target && potentialTargets.length > 0) {
      const firstTarget = potentialTargets[0];
      const firstDamageAdjective = firstTarget.isALivingBeing ? 'dead' : 'destroyed';

      if (potentialTargets.length === 1) {
        const linkingVerb = firstTarget.isPlural ? 'are' : 'is';
        const damageAdjective = firstTarget.isALivingBeing ? 'dead' : 'destroyed';

        return {
          isDone: true,
          target: firstTarget,
          messages: pickRandomText([
            `That ${firstTarget.name} ${linkingVerb} already ${damageAdjective}.${
              firstTarget.isALivingBeing ? ' Leave the corpse in peace you monster' : ''
            }`,
            `It's ${damageAdjective}, ok?`,
            `The ${firstTarget.name} ${linkingVerb} ${firstDamageAdjective}`,
          ]),
        };
      }

      return {
        isDone: true,
        target: firstTarget,
        messages: `All the ${pluralize(
          firstTarget.name,
          potentialTargets.length,
        )} are ${firstDamageAdjective}`,
      };
    }

    let weapon = player.findWeaponByKeyWords(inputPhrases);

    if (!target) {
      return {
        pendingState: {
          action: this,
          input: weapon ? weapon.keyWords[0] : '',
          triggerWord,
        },
        callToAction: `${firstCharToCapital(triggerWord)} who?`,
      };
    }

    const { isALivingBeing } = target;
    const damageAdjective = isALivingBeing ? 'dead' : 'destroyed';
    const verb = target.isPlural ? 'are' : 'is';

    if (target.outOfRange)
      return {
        isDone: true,
        target,
        messages: pickRandomText([
          `You can't reach there, it's to far!`,
          `That ${target.name} ${verb} out of your range`,
          'Nope, out of your range',
        ]),
      };

    if (attacksAgainstLivingCreatures.includes(triggerWord) && !isALivingBeing)
      return {
        isDone: true,
        target,
        messages: pickRandomText([`You can't really do that to the ${target.name}, now can you?`]),
      };

    if (target.attackResponse)
      return {
        isDone: true,
        target,
        messages: target.attackResponse(input),
      };

    if (naturalAttacks.includes(triggerWord)) {
      let type = '';

      /* eslint-disable indent */
      switch (triggerWord) {
        case 'kick':
          type = 'foot';
          break;

        case 'choke':
        case 'slap':
          type = 'hand';
          break;

        default:
          type = 'fist';
      }
      /* eslint-enable indent */
      weapon = player.findWeaponByKeyWords([type]);
    }

    if (!weapon) {
      return {
        target,
        pendingState: {
          action: this,
          input: target.name,
          triggerWord,
        },
        callToAction: 'With what?',
      };
    }

    const weaponName = triggerWord === 'slap' ? 'open hand' : weapon.name;
    const messages: Message[] = [];

    if (isALivingBeing) {
      const [playerWon, testMessages] = player.testAttribute('dexterity', target);

      if (!playerWon)
        return {
          isDone: true,
          target,
          messages: [
            ...testMessages,
            [`Your attack missed the target, the ${target.name} got away!`, { className: 'red' }],
          ],
        };

      messages.push(...testMessages);
    }

    const damageDone = player.attack(target, weapon);

    if (damageDone > 0) {
      messages.push([
        `You attack ${target.name} with your ${weaponName} and deal ${damageDone} damange`,
        { className: 'yellow' },
      ]);

      const isTargetDead = target.isDead();

      if (isTargetDead) {
        messages.push([
          `The ${target.name} ${verb} now ${damageAdjective}!`,
          { className: 'green' },
        ]);
      } else {
        messages.push(`The ${target.name} ${verb} not yet ${damageAdjective}!`);
      }

      return { target, messages };
    }

    if (isALivingBeing) {
      return {
        isDone: true,
        target,
        messages: pickRandomText([
          `You attack ${target.name} but to no effect`,
          `Your ${weaponName} can't hurt ${target.name}`,
        ]),
      };
    }

    messages.push(
      pickRandomText([
        `Unsurprisingly that did nothiing`,
        `The ${target.name} didn't move an inch`,
        `Why would you think it's going to work?`,
        'That is not going to work',
        'You acomplised nothing',
      ]),
    );

    return { isDone: true, target, messages };
  },
});
