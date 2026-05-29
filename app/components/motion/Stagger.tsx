import {motion, useReducedMotion, type Variants} from 'motion/react';
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
  delayChildren?: number;
  staggerChildren?: number;
};

export function Stagger({
  as = 'div',
  children,
  className,
  delayChildren = staggerContainer.visible.transition.delayChildren,
  staggerChildren = staggerContainer.visible.transition.staggerChildren,
}: StaggerProps) {
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
    variants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren,
          delayChildren,
        },
      },
    },
  };

  if (as === 'ul') {
    return <motion.ul {...motionProps}>{children}</motion.ul>;
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
}

type StaggerItemProps = {
  as?: 'div' | 'article' | 'li';
  children: ReactNode;
  className?: string;
  duration?: number;
  id?: string;
  variants?: Variants;
};

export function StaggerItem({
  as = 'div',
  children,
  className,
  duration = MOTION_DURATION.medium,
  id,
  variants = fadeUp,
}: StaggerItemProps) {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();

  if (!mounted || reducedMotion) {
    switch (as) {
      case 'article':
        return (
          <article className={className} id={id}>
            {children}
          </article>
        );
      case 'li':
        return (
          <li className={className} id={id}>
            {children}
          </li>
        );
      default:
        return (
          <div className={className} id={id}>
            {children}
          </div>
        );
    }
  }

  const motionProps = {
    className,
    id,
    variants,
    transition: {
      duration,
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
