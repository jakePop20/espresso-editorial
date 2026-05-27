import {
  QUIZ_PAGE,
  QUIZ_PRIMARY_CTA,
  QUIZ_RETAKE_LABEL,
} from '~/lib/quiz/content';
import type {
  QuizAnswerIndex,
  QuizChoiceContent,
  QuizPageContent,
  QuizProfileContent,
  QuizStepContent,
} from '~/lib/quiz/types';
import type {QuizPageQuery} from 'storefrontapi.generated';

type QuizPageRecord = QuizPageQuery['quizPage'];
type QuizStepNode = Extract<
  NonNullable<
    NonNullable<NonNullable<QuizPageRecord>['steps']>['references']
  >['nodes'][number],
  {__typename: 'Metaobject'}
>;
type QuizChoiceNode = Extract<
  NonNullable<
    NonNullable<QuizStepNode['choices']>['references']
  >['nodes'][number],
  {__typename: 'Metaobject'}
>;
type QuizProfileNode = Extract<
  NonNullable<
    NonNullable<NonNullable<QuizPageRecord>['profiles']>['references']
  >['nodes'][number],
  {__typename: 'Metaobject'}
>;

const ANSWER_INDICES = new Set<QuizAnswerIndex>([0, 1, 2]);

function isAnswerIndex(value: number): value is QuizAnswerIndex {
  return ANSWER_INDICES.has(value as QuizAnswerIndex);
}

function parseAnswerIndex(value: string | null | undefined): QuizAnswerIndex | null {
  const parsed = Number.parseInt(value?.trim() ?? '', 10);
  if (!Number.isInteger(parsed) || !isAnswerIndex(parsed)) return null;
  return parsed;
}

function parseQuizChoice(node: QuizChoiceNode): QuizChoiceContent | null {
  if (node?.__typename !== 'Metaobject') return null;

  const id = parseAnswerIndex(node.answerIndex?.value);
  const title = node.title?.value?.trim();
  const description = node.description?.value?.trim();
  const icon = node.icon?.value?.trim();
  if (id === null || !title || !description || !icon) return null;

  return {id, title, description, icon};
}

function parseQuizStep(node: QuizStepNode): QuizStepContent | null {
  if (node?.__typename !== 'Metaobject') return null;

  const category = node.category?.value?.trim();
  const question = node.question?.value?.trim();
  const lead = node.lead?.value?.trim();
  if (!category || !question || !lead) return null;

  const choices =
    node.choices?.references?.nodes
      ?.filter((choice): choice is QuizChoiceNode => choice?.__typename === 'Metaobject')
      .map(parseQuizChoice)
      .filter((choice): choice is QuizChoiceContent => choice !== null) ?? [];

  if (choices.length !== 3) return null;

  return {category, question, lead, choices};
}

function parseQuizProfile(
  node: QuizProfileNode,
): [QuizAnswerIndex, QuizProfileContent] | null {
  if (node?.__typename !== 'Metaobject') return null;

  const profileKey = parseAnswerIndex(node.profileKey?.value);
  const title = node.title?.value?.trim();
  const subtitle = node.subtitle?.value?.trim();
  const description = node.description?.value?.trim();
  if (profileKey === null || !title || !subtitle || !description) return null;

  return [profileKey, {title, subtitle, description}];
}

function withHardcodedCtas(content: Omit<QuizPageContent, 'primaryCta' | 'retakeLabel'>): QuizPageContent {
  return {
    ...content,
    primaryCta: {...QUIZ_PRIMARY_CTA},
    retakeLabel: QUIZ_RETAKE_LABEL,
  };
}

export function getDefaultQuizPage(): QuizPageContent {
  return withHardcodedCtas({
    metaTitle: QUIZ_PAGE.metaTitle,
    resultLabel: QUIZ_PAGE.resultLabel,
    steps: QUIZ_PAGE.steps.map((step) => ({
      ...step,
      choices: step.choices.map((choice) => ({...choice})),
    })),
    profiles: {
      0: {...QUIZ_PAGE.profiles[0]},
      1: {...QUIZ_PAGE.profiles[1]},
      2: {...QUIZ_PAGE.profiles[2]},
    },
  });
}

export function parseQuizPage(
  quizPage: QuizPageRecord,
): QuizPageContent | null {
  if (!quizPage?.id) return null;

  const defaults = getDefaultQuizPage();
  const metaTitle =
    quizPage.metaTitle?.value?.trim() || defaults.metaTitle;

  const steps =
    quizPage.steps?.references?.nodes
      ?.filter((node): node is QuizStepNode => node?.__typename === 'Metaobject')
      .map(parseQuizStep)
      .filter((step): step is QuizStepContent => step !== null) ?? [];

  const profileEntries =
    quizPage.profiles?.references?.nodes
      ?.filter((node): node is QuizProfileNode => node?.__typename === 'Metaobject')
      .map(parseQuizProfile)
      .filter(
        (entry): entry is [QuizAnswerIndex, QuizProfileContent] => entry !== null,
      ) ?? [];

  const profiles = {...defaults.profiles};
  for (const [key, profile] of profileEntries) {
    profiles[key] = profile;
  }

  return withHardcodedCtas({
    metaTitle,
    resultLabel: quizPage.resultLabel?.value?.trim() || defaults.resultLabel,
    steps: steps.length ? steps : defaults.steps,
    profiles,
  });
}
