import {useEffect, useState} from 'react';

/** True after client hydration — avoids SSR/hydration rendering hidden motion states. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
