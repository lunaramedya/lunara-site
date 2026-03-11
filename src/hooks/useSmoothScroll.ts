import { useCallback } from 'react';

export function useSmoothScroll(offset = 84) {
  return useCallback(
    (id: string) => {
      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    },
    [offset],
  );
}
