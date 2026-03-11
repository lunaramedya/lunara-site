import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { contactInfo } from '../../data/siteData';

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${contactInfo.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-[#25D366] text-white shadow-[0_16px_36px_rgba(37,211,102,0.35)]"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 1.8, repeat: Infinity }}
      aria-label="WhatsApp'tan yaz"
    >
      <MessageCircle size={24} />
    </motion.a>
  );
}
