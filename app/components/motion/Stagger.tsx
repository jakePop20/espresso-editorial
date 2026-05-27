import {motion, useReducedMotion} from 'motion/react';
import type {ReactNode} from 'react';
import {
  EDITORIAL_EASE,
  fadeUp,
  MOTION_DURATION,
  staggerContainer,
  viewport,
} from '~/lib/motion/presets';
import {useMounted} from '~/lib/motion/useMounted';

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'ul';
};

export function Stagger({as = 'div', children, className}: StaggerProps) {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();

  if (!mounted || reducedMotion) {
    if (as === 'ul') {
      return <ul className={className}>{children}</ul>;
    }
    return <div className={className}>{children}</div>;
  }

  const motionProps = {
    className,
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport,
    variants: staggerContainer,
  };

  if (as === 'ul') {
    return <motion.ul {...motionProps}>{children}</motion.ul>;
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
};

export function StaggerItem({as = 'div', children, className}: StaggerItemProps) {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();

  if (!mounted || reducedMotion) {
    switch (as) {
      case 'article':
        return <article className={className}>{children}</article>;
      case 'li':
        return <li className={className}>{children}</li>;
      default:
        return <div className={className}>{children}</div>;
    }
  }

  const motionProps = {
    className,
    variants: fadeUp,
    transition: {
      duration: MOTION_DURATION.medium,
      ease: EDITORIAL_EASE,
    },
  };

  switch (as) {
    case 'article':
      return <motion.article {...motionProps}>{children}</motion.article>;
    case 'li':
      return <motion.li {...motionProps}>{children}</motion.li>;
    default:
      return <motion.div {...motionProps}>{children}</motion.div>;
  }
}
