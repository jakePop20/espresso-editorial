import {motion, useReducedMotion} from 'motion/react';
import type {ReactNode} from 'react';
import {EDITORIAL_EASE} from '~/lib/motion/presets';
import {useMounted} from '~/lib/motion/useMounted';
import {useScrollHeader} from '~/lib/motion/useScrollHeader';

type ScrollSiteHeaderProps = {
  children: ReactNode;
};

export function ScrollSiteHeader({children}: ScrollSiteHeaderProps) {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const visible = useScrollHeader();

  if (!mounted || reducedMotion) {
    return <header className="site-header">{children}</header>;
  }

  return (
    <motion.header
      animate={{y: visible ? 0 : '-100%'}}
      className="site-header"
      initial={false}
      transition={{
        duration: 0.45,
        ease: EDITORIAL_EASE,
      }}
    >
      {children}
    </motion.header>
  );
}
