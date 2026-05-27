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

export const viewport = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -64px 0px',
} as const;

export const HOVER_TRANSITION = {
  duration: 0.55,
  ease: EDITORIAL_EASE,
} as const;
