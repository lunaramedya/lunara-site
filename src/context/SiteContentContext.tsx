import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  ADMIN_TOKEN_CHANGE_EVENT,
  clearAdminToken,
  fetchAdminContent,
  getAdminToken,
  updateAdminContent,
} from '../admin/adminApi';
import { defaultContent, type SiteContent } from '../data/defaultContent';

type SiteContentState = {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
  editMode: boolean;
  canEditContent: boolean;
  toggleEditMode: () => void;
  updateContentField: (path: string, value: any) => void;
  saveContent: () => Promise<void>;
};

const SiteContentContext = createContext<SiteContentState>({
  content: defaultContent,
  loading: true,
  refresh: async () => {},
  editMode: false,
  canEditContent: false,
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
  const [canEditContent, setCanEditContent] = useState(false);

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

  const checkAdminAccess = useCallback(async () => {
    if (!getAdminToken()) {
      setCanEditContent(false);
      setEditMode(false);
      return;
    }

    try {
      const data = await fetchAdminContent();
      if (data?.content) {
        setContent(mergeDeep(defaultContent, data.content));
      }
      setCanEditContent(true);
    } catch {
      clearAdminToken();
      setCanEditContent(false);
      setEditMode(false);
    }
  }, []);

  const toggleEditMode = useCallback(() => {
    setEditMode((prev) => (canEditContent ? !prev : false));
  }, [canEditContent]);

  const updateContentField = (path: string, value: any) => {
    if (!canEditContent) {
      return;
    }

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

  const saveContent = useCallback(async () => {
    if (!canEditContent) {
      setEditMode(false);
      return;
    }

    try {
      await updateAdminContent(content);
      console.log('Content auto-saved');
    } catch (err) {
      console.error('Save failed', err);
      if (err instanceof Error && err.message === 'Yetkisiz erişim.') {
        clearAdminToken();
        setCanEditContent(false);
        setEditMode(false);
      }
    }
  }, [canEditContent, content]);

  useEffect(() => {
    if (!editMode) return;
    if (!dirty) return;

    const timeout = setTimeout(() => {
      void saveContent();
      setDirty(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [content, dirty, editMode, saveContent]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    void checkAdminAccess();
    window.addEventListener(ADMIN_TOKEN_CHANGE_EVENT, checkAdminAccess);
    window.addEventListener('storage', checkAdminAccess);

    return () => {
      window.removeEventListener(ADMIN_TOKEN_CHANGE_EVENT, checkAdminAccess);
      window.removeEventListener('storage', checkAdminAccess);
    };
  }, [checkAdminAccess]);

  const value = useMemo(
    () => ({
      content,
      loading,
      refresh,
      editMode,
      canEditContent,
      toggleEditMode,
      updateContentField,
      saveContent,
    }),
    [content, loading, refresh, editMode, canEditContent, toggleEditMode, saveContent],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
