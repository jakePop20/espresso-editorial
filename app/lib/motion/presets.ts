/** Matches --ee-ease-editorial in tokens.css */
export const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

export const MOTION_DURATION = {
  slow: 0.9,
  medium: 0.6,
  hero: 1.1,
} as const;

export const fadeUp = {
  hidden: {opacity: 0, y: 28},
  visible: {opacity: 1, y: 0},
} as const;

export const fadeIn = {
  hidden: {opacity: 0},
  visible: {opacity: 1},
} as const;

export const scaleIn = {
  hidden: {opacity: 0, scale: 1.04},
  visible: {opacity: 1, scale: 1},
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
} as const;

/** Quiz entrance — more travel than default fade-up (hero uses ~32px in CSS). */
export const quizFadeUp = {
  hidden: {opacity: 0, y: 48},
  visible: {opacity: 1, y: 0},
} as const;

/** Step-transition cards — gentler travel than first-load entrance. */
export const quizStepFadeUp = {
  hidden: {opacity: 0, y: 32},
  visible: {opacity: 1, y: 0},
} as const;

export const QUIZ_STEP_CARD_DURATION = 1.15;

/** Shared start for step header + first card; gap between subsequent cards. */
export const QUIZ_STEP_ENTRANCE_START_DELAY = 0.1;
export const QUIZ_STEP_CARD_STAGGER_DELAY = 0.22;

export function quizStepEntranceDelay(
  itemIndex: number,
  play: boolean,
): number {
  if (!play) return 0;
  return (
    QUIZ_STEP_ENTRANCE_START_DELAY + itemIndex * QUIZ_STEP_CARD_STAGGER_DELAY
  );
}

export const viewport = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -64px 0px',
} as const;

export const HOVER_TRANSITION = {
  duration: 0.55,
  ease: EDITORIAL_EASE,
} as const;
