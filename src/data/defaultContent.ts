import {
  agencySignals,
  blogPosts,
  caseStudies,
  contactInfo,
  faqs,
  legalLinks,
  navItems,
  pricingPlans,
  processSteps,
  serviceCategories,
  socialLinks,
  stats,
} from './siteData';

export const defaultContent = {
  navItems,
  stats,
  agencySignals,
  serviceCategories,
  processSteps,
  caseStudies,
  pricingPlans,
  faqs,
  blogPosts,
  contactInfo,
  socialLinks,
  legalLinks,
  hero: {
    badge: 'Dijital büyümenin yeni adresi',
    title: 'Premium görünüm, net mesaj ve',
    highlight: 'daha fazla talep üreten sistemler',
    subtitle:
      'Lunara Medya; hizmet ve premium algı odaklı markalar için web sitesi, landing page, Meta Ads ve kreatif sistemleri tek çatı altında kurar. Amaç yalnızca şık görünmek değil; daha güçlü güven, daha net başvuru ve daha yüksek dönüşümdür.',
    primaryCta: 'Ücretsiz Ön Analiz Al',
    secondaryCta: "WhatsApp'tan Yaz",
  },
  heroServices: ['Web Site Tasarımı', 'Meta Ads', 'Sosyal Medya Reklamcılığı', 'Landing Page', 'Kreatif Sistem'],
  socialProof: {
    badge: 'Neden Lunara',
    title: 'Sadece tasarım değil, sonuç üreten kurgu',
    subtitle:
      'Web, reklam ve kreatif katmanını tek bir sistemde birleştirerek markanızın güven algısını yükseltir, talep kararını hızlandırırız.',
    highlightTitle: 'Güven veren görünüm,',
    highlightHighlight: 'daha net başvuru akışı.',
    targetTitle: 'Kimler için doğru partneriz?',
    targetSubtitle:
      'Her marka için değil, dijitalde premium algı ve düzenli talep akışı hedefleyen işletmeler için en verimli modeli kuruyoruz.',
    targetSegments: [
      'Güzellik salonları ve butik beauty markaları',
      'Premium algı kurmak isteyen hizmet işletmeleri',
      'Reklam trafiğini boşa harcamak istemeyen markalar',
      'WhatsApp ve formdan daha net talep akışı arayan ekipler',
      'Dijitalde daha güvenilir ve daha otoriter görünmek isteyen işletmeler',
    ],
  },
  servicesSection: {
    title: 'Markanızı büyüten hizmet katmanları',
    subtitle:
      'Web tasarımı, reklam yönetimi ve kreatif yön tek başına değil, birbirini besleyen tek bir büyüme sistemi olarak çalıştığında gerçek etki ortaya çıkar.',
  },
  casesSection: {
    badge: 'Referanslar',
    title: 'Seçili referanslarımız',
    subtitle:
      'Farklı sektörlerde kurduğumuz iki farklı premium yaklaşım, tasarım dilini ve kullanıcı kararını nasıl güçlendirdiğimizi net biçimde gösteriyor.',
  },
  packagesSection: {
    badge: 'Çalışma Modelleri',
    title: 'İhtiyaca göre ölçeklenen paketler',
    subtitle:
      'Bazı markalar için güçlü bir başlangıç yeterlidir, bazıları ise web ve reklam sistemini birlikte kurmak ister. Paketleri buna göre şekillendiriyoruz.',
    footnote:
      'Paketler başlangıç çerçevesidir. Nihai kapsam; marka yapısı, sayfa yoğunluğu ve reklam ihtiyacına göre netleşir.',
  },
  processSection: {
    badge: '4 Adımda İlerleme',
    title: 'Net süreç, net ilerleme',
    subtitle:
      'Belirsiz revize döngüleri yerine; önce yön, sonra tasarım ve build, ardından ölçekleme mantığıyla hızlı ama kontrollü ilerliyoruz.',
  },
  faqSection: {
    badge: 'FAQ',
    title: 'Karar vermeden önce en çok sorulanlar',
    subtitle: 'Fiyat, süreç, reklam bütçesi ve teslim modeliyle ilgili kritik soruları net şekilde cevapladık.',
  },
  contactSection: {
    badge: 'Contact',
    title: 'Projeyi birlikte başlatalım',
    subtitle:
      'Markanızın hedefini, istediğiniz görünümü ve hizmet ihtiyacınızı paylaşın. Size uygun web, reklam ve büyüme modelini net biçimde kuralım.',
    formBadge: 'Project Brief',
    formTitle: 'Briefinizi bırakın,',
    formHighlight: 'güçlü bir başlangıç hazırlayalım.',
    directBadge: 'Direct Contact',
    directTitle: 'Hızlı dönüş,',
    directSubtitle: 'net yol haritası.',
  },
  contactFormOptions: {
    serviceOptions: [
      'Web Site Tasarımı',
      'Landing Page & Funnel',
      'Meta Ads Yönetimi',
      'Sosyal Medya Reklamcılığı',
      'Google Ads & Arama',
      'Tam Kapsam Çalışma',
    ],
    budgetOptions: [
      'Henüz belirlenmedi',
      '15.000 TL altı',
      '15.000 TL - 30.000 TL',
      '30.000 TL - 60.000 TL',
      '60.000 TL ve üzeri',
    ],
  },
  footer: {
    description:
      'Dijital büyümenin yeni adresi. Lunara Medya; premium web tasarımı, Meta Ads, sosyal medya reklamcılığı ve kreatif sistemlerle markalara daha güçlü bir dijital görünüm kurar.',
    ctaLabel: 'Teklif Al',
  },
};

export type SiteContent = typeof defaultContent;
