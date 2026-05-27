import {motion, useReducedMotion, type Variants} from 'motion/react';
import type {ReactNode} from 'react';
import {
  EDITORIAL_EASE,
  fadeUp,
  MOTION_DURATION,
  viewport,
} from '~/lib/motion/presets';
import {useMounted} from '~/lib/motion/useMounted';

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'blockquote';
  delay?: number;
  variants?: Variants;
  duration?: number;
  'aria-hidden'?: boolean;
};

function StaticReveal({
  as = 'div',
  children,
  className,
  'aria-hidden': ariaHidden,
}: RevealProps) {
  const props = {
    className,
    ...(ariaHidden !== undefined ? {'aria-hidden': ariaHidden} : {}),
  };

  switch (as) {
    case 'section':
      return <section {...props}>{children}</section>;
    case 'article':
      return <article {...props}>{children}</article>;
    case 'blockquote':
      return <blockquote {...props}>{children}</blockquote>;
    default:
      return <div {...props}>{children}</div>;
  }
}

export function Reveal({
  as = 'div',
  children,
  className,
  delay = 0,
  duration = MOTION_DURATION.slow,
  variants = fadeUp,
  'aria-hidden': ariaHidden,
}: RevealProps) {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();

  if (!mounted || reducedMotion) {
    return (
      <StaticReveal
        aria-hidden={ariaHidden}
        as={as}
        className={className}
      >
        {children}
      </StaticReveal>
    );
  }

  const transition = {
    duration,
    ease: EDITORIAL_EASE,
    delay,
  };
  const motionProps = {
    className,
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport,
    variants,
    transition,
    ...(ariaHidden !== undefined ? {'aria-hidden': ariaHidden} : {}),
  };

  switch (as) {
    case 'section':
      return <motion.section {...motionProps}>{children}</motion.section>;
    case 'article':
      return <motion.article {...motionProps}>{children}</motion.article>;
    case 'blockquote':
      return <motion.blockquote {...motionProps}>{children}</motion.blockquote>;
    default:
      return <motion.div {...motionProps}>{children}</motion.div>;
  }
}
