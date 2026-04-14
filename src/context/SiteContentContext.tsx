import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { defaultContent, type SiteContent } from '../data/defaultContent';

type SiteContentState = {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
};

const SiteContentContext = createContext<SiteContentState>({
  content: defaultContent,
  loading: true,
  refresh: async () => {},
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function mergeDeep<T>(base: T, override: unknown): T {
  if (!isRecord(base)) {
    return (override as T) ?? base;
  }

  if (!isRecord(override)) {
    return (override as T) ?? base;
  }

  const result: Record<string, unknown> = { ...base };

  Object.keys(override).forEach((key) => {
    const baseValue = (base as Record<string, unknown>)[key];
    const overrideValue = override[key];

    if (Array.isArray(baseValue)) {
      result[key] = Array.isArray(overrideValue) ? overrideValue : baseValue;
      return;
    }

    if (isRecord(baseValue)) {
      result[key] = mergeDeep(baseValue, overrideValue);
      return;
    }

    result[key] = overrideValue ?? baseValue;
  });

  return result as T;
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/content');
      const data = await response.json();
      if (data?.content) {
        setContent(mergeDeep(defaultContent, data.content));
      } else {
        setContent(defaultContent);
      }
    } catch {
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      content,
      loading,
      refresh,
    }),
    [content, loading, refresh],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
