import {useEffect, useRef, useState} from 'react';

const DEFAULT_THRESHOLD = 10;
const TOP_LOCK_OFFSET = 64;

/**
 * Returns true when the fixed header should be visible.
 * Hides on scroll down, shows on scroll up; always visible near the top of the page.
 */
export function useScrollHeader(threshold = DEFAULT_THRESHOLD) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    let frame = 0;

    const onScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;

        if (currentScrollY <= TOP_LOCK_OFFSET) {
          setVisible(true);
        } else if (delta > threshold) {
          setVisible(false);
        } else if (delta < -threshold) {
          setVisible(true);
        }

        lastScrollY.current = currentScrollY;
        frame = 0;
      });
    };

    window.addEventListener('scroll', onScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return visible;
}
