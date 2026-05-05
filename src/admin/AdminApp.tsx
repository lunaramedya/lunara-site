import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '../components/ui/Button';
import { defaultContent } from '../data/defaultContent';
import {
  adminLogin,
  clearAdminToken,
  fetchAdminContent,
  fetchContacts,
  fetchLeads,
  fetchLogs,
  updateAdminContent,
} from './adminApi';

type AdminTab = 'content' | 'logs' | 'leads' | 'contacts';

export function AdminApp() {
  const [isAuthed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('logs');
  const [contentText, setContentText] = useState('');
  const [contentDirty, setContentDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<unknown[]>([]);
  const [leads, setLeads] = useState<unknown[]>([]);
  const [contacts, setContacts] = useState<unknown[]>([]);

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminContent();
      const value = data?.content ?? defaultContent;
      setContentText(JSON.stringify(value, null, 2));
      setContentDirty(false);
      setAuthed(true);
    } catch (err) {
      clearAdminToken();
      setAuthed(false);
      setError(err instanceof Error ? err.message : 'İçerik alınamadı.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  useEffect(() => {
    if (!isAuthed) {
      return;
    }
    if (activeTab === 'logs') {
      fetchLogs(200).then((data) => setLogs(data.items ?? [])).catch(() => setLogs([]));
    }
    if (activeTab === 'leads') {
      fetchLeads(200).then((data) => setLeads(data.items ?? [])).catch(() => setLeads([]));
    }
    if (activeTab === 'contacts') {
      fetchContacts(200).then((data) => setContacts(data.items ?? [])).catch(() => setContacts([]));
    }
  }, [activeTab, isAuthed]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await adminLogin(password);
      await loadContent();
      setActiveTab('logs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş başarısız.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const parsed = JSON.parse(contentText);
      await updateAdminContent(parsed);
      setContentDirty(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'İçerik kaydedilemedi.');
    } finally {
      setLoading(false);
    }
  };

  const activeData = useMemo(() => {
    if (activeTab === 'logs') {
      return logs;
    }
    if (activeTab === 'leads') {
      return leads;
    }
    if (activeTab === 'contacts') {
      return contacts;
    }
    return [];
  }, [activeTab, contacts, leads, logs]);

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] px-4 py-12 text-[var(--color-ink)]">
        <div className="mx-auto max-w-md rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_30px_80px_rgba(2,8,20,0.5)]">
          <h1 className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
            Admin Panel
          </h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            İçerikleri düzenlemek için admin şifrenizle giriş yapın.
          </p>
          <div className="mt-6 space-y-3">
            <label className="text-sm font-medium">Admin Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 w-full rounded-[16px] border border-[var(--color-border-strong)] bg-white/6 px-4 text-sm text-[var(--color-ink)]"
            />
          </div>
          {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
          <Button className="mt-5 w-full" onClick={handleLogin} disabled={loading}>
            {loading ? 'Giriş...' : 'Giriş Yap'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-8 text-[var(--color-ink)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div>
          <h1 className="text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            Admin Panel
          </h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Önce logları inceleyin, ardından içerikleri düzenleyin.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            clearAdminToken();
            setAuthed(false);
          }}
        >
          Çıkış
        </Button>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl gap-3">
        {([
          { id: 'logs', label: 'Loglar' },
          { id: 'content', label: 'İçerik' },
        ] as { id: AdminTab; label: string }[]).map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'outline'}
            onClick={() => {
              if (tab.id === 'content') {
                setActiveTab('content');
                window.open('/', '_blank');
              } else {
                setActiveTab(tab.id);
              }
            }}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-6xl rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_24px_60px_rgba(2,8,20,0.42)]">
        {activeTab === 'content' ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                Site İçeriği (JSON)
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setContentText(JSON.stringify(defaultContent, null, 2));
                    setContentDirty(true);
                  }}
                >
                  Varsayılanı Yükle
                </Button>
                <Button onClick={handleSave} disabled={loading || !contentDirty}>
                  {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
              </div>
            </div>
            <p className="mt-3 text-sm text-[var(--color-muted)]">
              İçeriği buradan düzenleyip kaydedebilirsiniz. JSON geçerli olmalıdır.
            </p>
            <p className="mt-2 text-xs text-[var(--color-muted)]">
              İpucu: "İçerik" butonu ile ana sayfayı açıp görsel edit modunda düzenleyebilirsiniz.
            </p>
            <textarea
              className="mt-4 min-h-[420px] w-full rounded-[18px] border border-[var(--color-border-strong)] bg-[#0b1323] p-4 text-xs text-white/80"
              value={contentText}
              onChange={(event) => {
                setContentText(event.target.value);
                setContentDirty(true);
              }}
            />
            {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                {activeTab === 'logs'
                  ? 'Kullanıcı Logları'
                  : activeTab === 'leads'
                    ? 'Teklif Talepleri'
                    : 'İletişim Talepleri'}
              </h2>
              <Button
                variant="outline"
                onClick={() => {
                  if (activeTab === 'logs') {
                    fetchLogs(200).then((data) => setLogs(data.items ?? [])).catch(() => setLogs([]));
                  }
                  if (activeTab === 'leads') {
                    fetchLeads(200).then((data) => setLeads(data.items ?? [])).catch(() => setLeads([]));
                  }
                  if (activeTab === 'contacts') {
                    fetchContacts(200).then((data) => setContacts(data.items ?? [])).catch(() => setContacts([]));
                  }
                }}
              >
                Yenile
              </Button>
            </div>
            <pre className="mt-4 max-h-[520px] overflow-auto rounded-[20px] border border-white/10 bg-[#0b1323] p-4 text-xs text-white/70">
              {JSON.stringify(activeData, null, 2)}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}
