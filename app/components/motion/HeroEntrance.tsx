import {motion, useReducedMotion} from 'motion/react';
import type {ReactNode} from 'react';
import {
  EDITORIAL_EASE,
  fadeUp,
  MOTION_DURATION,
  scaleIn,
  staggerContainer,
} from '~/lib/motion/presets';
import {useMounted} from '~/lib/motion/useMounted';

type HeroEntranceProps = {
  media: ReactNode;
  content: ReactNode;
};

export function HeroEntrance({media, content}: HeroEntranceProps) {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();

  if (!mounted || reducedMotion) {
    return (
      <>
        <div className="homepage-hero__media">{media}</div>
        <div className="homepage-hero__content">{content}</div>
      </>
    );
  }

  return (
    <>
      <motion.div
        className="homepage-hero__media"
        initial="hidden"
        animate="visible"
        variants={scaleIn}
        transition={{
          duration: MOTION_DURATION.hero,
          ease: EDITORIAL_EASE,
        }}
      >
        {media}
      </motion.div>
      <motion.div
        className="homepage-hero__content"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {content}
      </motion.div>
    </>
  );
}

type HeroEntranceItemProps = {
  children: ReactNode;
  className?: string;
};

export function HeroEntranceItem({children, className}: HeroEntranceItemProps) {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();

  if (!mounted || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={{
        duration: MOTION_DURATION.slow,
        ease: EDITORIAL_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
