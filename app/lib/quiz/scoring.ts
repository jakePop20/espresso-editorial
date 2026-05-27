import type {QuizAnswerIndex} from '~/lib/quiz/types';

export function computeProfile(answers: QuizAnswerIndex[]): QuizAnswerIndex {
  const counts: Record<QuizAnswerIndex, number> = {0: 0, 1: 0, 2: 0};
  for (const answer of answers) counts[answer] += 1;

  const ordered: QuizAnswerIndex[] = [0, 1, 2];
  ordered.sort((a, b) => counts[b] - counts[a]);
  return ordered[0];
}
