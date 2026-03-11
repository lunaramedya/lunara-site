import { Instagram, Mail, Phone } from 'lucide-react';
import { contactInfo, legalLinks, navItems, serviceCategories } from '../../data/siteData';
import { BrandMark } from '../brand/BrandMark';
import { Button } from '../ui/Button';

type FooterProps = {
  onNavigate: (id: string) => void;
};

export function Footer({ onNavigate }: FooterProps) {
  const serviceNames = serviceCategories.flatMap((group) => group.items.map((item) => item.title));
  const whatsappHref = `https://wa.me/${contactInfo.whatsapp}`;
  const mailtoHref = `mailto:${contactInfo.email}`;

  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#07101d,#040813)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 text-center md:grid-cols-2 md:px-8 md:text-left lg:grid-cols-[1.05fr_0.7fr_0.8fr_0.85fr]">
        <div className="space-y-5 md:justify-self-start">
          <BrandMark brand="lunara" inverse className="justify-center md:justify-start" />
          <p className="mx-auto max-w-md text-sm leading-7 text-white/68 md:mx-0">
            Dijital büyümenin yeni adresi. Lunara Medya; premium web tasarımı, Meta Ads, sosyal medya reklamcılığı
            ve kreatif sistemlerle markalara daha güçlü bir dijital görünüm kurar.
          </p>
          <Button variant="secondary" onClick={() => onNavigate('contact')} className="mx-auto md:mx-0">
            Teklif Al
          </Button>
        </div>

        <div className="md:justify-self-start">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/52">Navigasyon</p>
          <ul className="space-y-3 text-sm text-white/70">
            {navItems.map((item) => (
              <li key={item.id}>
                <button type="button" className="transition hover:text-white" onClick={() => onNavigate(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:justify-self-start">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/52">Hizmetler</p>
          <ul className="space-y-3 text-sm text-white/70">
            {serviceNames.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div className="md:justify-self-start">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/52">İletişim</p>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start justify-center gap-2 text-center md:justify-start md:text-left">
              <Phone size={15} className="mt-1 shrink-0 text-[var(--color-primary)]" />
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="transition hover:text-white">
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex items-start justify-center gap-2 text-center md:justify-start md:text-left">
              <Mail size={15} className="mt-1 shrink-0 text-[var(--color-primary)]" />
              <a href={mailtoHref} className="transition hover:text-white">
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-start justify-center gap-2 text-center md:justify-start md:text-left">
              <Instagram size={15} className="mt-1 shrink-0 text-[var(--color-primary)]" />
              <a href={contactInfo.instagramUrl} target="_blank" rel="noreferrer" className="transition hover:text-white">
                {contactInfo.instagramHandle}
              </a>
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-white/44 md:justify-start">
            {legalLinks.map((link) => (
              <a key={link.id} href={link.href} className="transition hover:text-white/78">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 py-5 text-center text-xs text-white/38">
        © {new Date().getFullYear()} Lunara Medya. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
