import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { defaultContent, type SiteContent } from '../data/defaultContent';

type SiteContentState = {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
  editMode: boolean;
  toggleEditMode: () => void;
  updateContentField: (path: string, value: any) => void;
  saveContent: () => Promise<void>;
};

const SiteContentContext = createContext<SiteContentState>({
  content: defaultContent,
  loading: true,
  refresh: async () => {},
  editMode: false,
  toggleEditMode: () => {},
  updateContentField: () => {},
  saveContent: async () => {},
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

  const [editMode, setEditMode] = useState(false);

  const [dirty, setDirty] = useState(false);

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

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const updateContentField = (path: string, value: any) => {
    setContent((prev) => {
      const keys = path.split('.');
      const newContent: any = { ...prev };
      let current = newContent;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = value;
        } else {
          current[key] = { ...current[key] };
          current = current[key];
        }
      });

      return newContent;
    });

    setDirty(true);
  };

  useEffect(() => {
    if (!editMode) return;
    if (!dirty) return;

    const timeout = setTimeout(() => {
      saveContent();
      setDirty(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [content]);

  const saveContent = async () => {
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      console.log('Content auto-saved');
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      content,
      loading,
      refresh,
      editMode,
      toggleEditMode,
      updateContentField,
      saveContent,
    }),
    [content, loading, refresh, editMode],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
