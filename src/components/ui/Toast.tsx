import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, TriangleAlert, X } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '../../utils/cn';

type ToastProps = {
  open: boolean;
  type: 'success' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
  durationMs?: number;
};

export function Toast({
  open,
  type,
  title,
  message,
  onClose,
  durationMs = 4800,
}: ToastProps) {
  const isSuccess = type === 'success';

  useEffect(() => {
    if (!open || !onClose) {
      return;
    }

    const timeout = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(timeout);
  }, [durationMs, onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={cn(
            'fixed right-4 top-4 z-[90] w-[min(calc(100vw-2rem),24rem)] overflow-hidden rounded-[24px] border px-4 py-4 text-sm shadow-[0_24px_60px_rgba(2,8,20,0.45)] backdrop-blur-xl md:right-6 md:top-6',
            isSuccess
              ? 'border-[rgba(135,255,195,0.22)] bg-[linear-gradient(180deg,rgba(8,16,30,0.96),rgba(5,10,20,0.98))] text-white'
              : 'border-[rgba(255,120,145,0.24)] bg-[linear-gradient(180deg,rgba(24,10,18,0.96),rgba(16,7,13,0.98))] text-white',
          )}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3 pr-8">
            <div
              className={cn(
                'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border',
                isSuccess
                  ? 'border-emerald-400/28 bg-emerald-400/12 text-emerald-300'
                  : 'border-rose-400/28 bg-rose-400/12 text-rose-300',
              )}
            >
              {isSuccess ? <CheckCircle2 size={18} /> : <TriangleAlert size={18} />}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{title ?? (isSuccess ? 'Başarılı' : 'Hata')}</p>
              <p className="mt-1 text-sm leading-6 text-white/72">{message}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full p-1.5 text-white/50 transition hover:bg-white/8 hover:text-white"
            aria-label="Bildirimi kapat"
          >
            <X size={16} />
          </button>

          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/6">
            <motion.div
              key={`${type}-${title}-${message}-${durationMs}`}
              className={cn('h-full origin-left', isSuccess ? 'bg-emerald-400' : 'bg-rose-400')}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: durationMs / 1000, ease: 'linear' }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
