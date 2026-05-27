import type {HomepageCta} from '~/lib/homepage/types';

export type QuizAnswerIndex = 0 | 1 | 2;

export type QuizChoiceContent = {
  id: QuizAnswerIndex;
  title: string;
  description: string;
  icon: string;
};

export type QuizStepContent = {
  category: string;
  question: string;
  lead: string;
  choices: QuizChoiceContent[];
};

export type QuizProfileContent = {
  title: string;
  subtitle: string;
  description: string;
};

export type QuizPageContent = {
  metaTitle: string;
  resultLabel: string;
  steps: QuizStepContent[];
  profiles: Record<QuizAnswerIndex, QuizProfileContent>;
  primaryCta: HomepageCta;
  retakeLabel: string;
};
