import { ActionInput, ActionResult } from '../action';

const demonstratives = ['it', 'that', 'this', 'them'];

export function checkForDefaultTarget({
  previousTarget,
  potentialTargets,
  inputPhrases,
}: ActionInput): ActionResult {
  if (potentialTargets.length > 1)
    return {
      error: ['Implement multiple choice', { prefix: 'error' }],
    };

  const target = potentialTargets.length > 0 ? potentialTargets[0] : undefined;

  if (previousTarget && !target && inputPhrases.some((phrase) => demonstratives.includes(phrase))) {
    return { target: previousTarget };
  }

  return { target };
}
