import {motion, useReducedMotion} from 'motion/react';
import {useEffect, useState} from 'react';
import type {ReactNode} from 'react';
import {
  EDITORIAL_EASE,
  MOTION_DURATION,
  quizFadeUp,
  staggerContainer,
} from '~/lib/motion/presets';
import {useMounted} from '~/lib/motion/useMounted';

type QuizEntranceProps = {
  children: ReactNode;
  className?: string;
};

/** Staggered fade-up on first paint (quiz page load). */
export function QuizEntrance({children, className}: QuizEntranceProps) {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    let outerFrame = 0;
    let innerFrame = 0;

    outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => setPlay(true));
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
    };
  }, [mounted, reducedMotion]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={play ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

type QuizEntranceItemProps = {
  children: ReactNode;
  className?: string;
};

export function QuizEntranceItem({children, className}: QuizEntranceItemProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={quizFadeUp}
      transition={{
        duration: MOTION_DURATION.slow,
        ease: EDITORIAL_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
