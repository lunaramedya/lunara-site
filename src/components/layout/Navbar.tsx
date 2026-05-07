import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { cn } from '../../utils/cn';
import { BrandMark } from '../brand/BrandMark';
import { Button } from '../ui/Button';

type NavbarProps = {
  activeSection: string;
  onNavigate: (id: string) => void;
  onOpenLeadModal: () => void;
};

export function Navbar({ activeSection, onNavigate, onOpenLeadModal }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { content, editMode, canEditContent, toggleEditMode } = useSiteContent();

  const handleNav = (id: string) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-4 mt-4 flex h-18 items-center justify-between rounded-full border border-[var(--color-border)] bg-[rgba(7,12,24,0.72)] px-3 shadow-[0_24px_50px_rgba(1,6,16,0.4)] backdrop-blur-2xl sm:mx-6 sm:h-20 sm:px-4 md:mx-auto md:max-w-7xl md:px-6">
        <button
          type="button"
          onClick={() => handleNav('hero')}
          className="inline-flex min-w-0 items-center gap-2 text-left sm:gap-3"
        >
          <BrandMark brand="lunara" className="min-w-0" />
        </button>

        <nav className="hidden items-center gap-1 rounded-full border border-[var(--color-border)] bg-white/4 p-1 md:flex" aria-label="Ana menü">
          {content.navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition',
                activeSection === item.id
                  ? 'bg-white/12 text-white shadow-[0_12px_30px_rgba(1,6,16,0.28)]'
                  : 'text-[var(--color-muted)] hover:text-white',
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {canEditContent && editMode && (
            <button
              onClick={toggleEditMode}
              className="rounded-full bg-black/60 px-3 py-1 text-xs text-white"
            >
              Edit Kapat
            </button>
          )}
          {canEditContent && !editMode && (
            <button
              onClick={toggleEditMode}
              className="rounded-full bg-black/60 px-3 py-1 text-xs text-white"
            >
              Edit Aç
            </button>
          )}
          <Button onClick={onOpenLeadModal}>{content.cta.primary}</Button>
        </div>

        <button
          type="button"
          className="inline-flex rounded-full border border-[var(--color-border)] bg-white/6 p-2 text-[var(--color-ink)] md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Mobil menüyü aç"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-4 mt-3 rounded-[28px] border border-[var(--color-border)] bg-[rgba(8,13,26,0.96)] px-4 pb-4 pt-3 shadow-[0_24px_44px_rgba(1,6,16,0.44)] backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobil menü">
              {content.navItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    'rounded-2xl px-4 py-3 text-left text-sm font-medium',
                    activeSection === item.id
                      ? 'bg-white/12 text-white'
                      : 'text-[var(--color-muted)]',
                  )}
                >
                  {item.label}
                </button>
              ))}
              {canEditContent ? (
                <button
                  onClick={toggleEditMode}
                  className="mt-2 rounded-2xl px-4 py-3 text-left text-sm font-medium bg-white/6 text-white"
                >
                  {editMode ? 'Edit Kapat' : 'Edit Aç'}
                </button>
              ) : null}
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  setOpen(false);
                  onOpenLeadModal();
                }}
              >
                {content.cta.primary}
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
