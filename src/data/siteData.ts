import type {
  AgencySignal,
  BlogPost,
  CaseStudy,
  ContactInfo,
  FaqItem,
  NavItem,
  PricingPlan,
  ProcessStep,
  ReferenceBrand,
  ServiceCategory,
  SocialLink,
  Testimonial,
} from '../types/site';

export const navItems: NavItem[] = [
  { id: 'services', label: 'Hizmetler', href: '#services' },
  { id: 'cases', label: 'Referanslar', href: '#cases' },
  { id: 'packages', label: 'Paketler', href: '#packages' },
  { id: 'process', label: 'Süreç', href: '#process' },
  { id: 'faq', label: 'SSS', href: '#faq' },
  { id: 'contact', label: 'İletişim', href: '#contact' },
];

export const stats = [
  'Premium web & landing page',
  'Meta Ads & dönüşüm kurgusu',
  'WhatsApp ve form odaklı akış',
  'Net süreç, kontrollü teslim',
  '15K - 35K proje modelleri',
];

export const referenceBrands: ReferenceBrand[] = [
  {
    id: 'loli',
    name: 'Loli Nail Studio',
    sector: 'Beauty',
    signature: 'Butik güzellik markası için yumuşak, feminen ve rezervasyon odaklı vitrin',
    description:
      'Daha zarif bir hizmet deneyimini dijitalde de hissettiren, yumuşak tonlar ve net rezervasyon akışıyla kurulan premium bir güzellik markası vitrini.',
    highlights: ['Yumuşak lüks hissi', 'Randevu odaklı akış', 'Feminen görsel dil', 'Instagram uyumlu görünüm'],
  },
  {
    id: 'master',
    name: 'Master Service',
    sector: 'Automotive',
    signature: 'Teknik uzmanlığı güçlü bilgi mimarisiyle öne çıkaran kurumsal yapı',
    description:
      'Yetkili servis güvenini, daha güçlü kontrast, daha net servis bilgisi ve çok daha hızlı aksiyon aldıran iletişim katmanıyla destekleyen yapı.',
    highlights: ['Kurumsal güven', 'Servis otoritesi', 'Bilgi mimarisi netliği', 'Güçlü CTA yerleşimi'],
  },
];

export const agencySignals: AgencySignal[] = [
  {
    id: 'signal-1',
    title: 'Premium arayüz',
    description:
      'Markanızın ilk izlenimini güçlendiren, ezber agency şablonlarından ayrışan yüksek kalite görsel doku ve arayüz sistemi kuruyoruz.',
  },
  {
    id: 'signal-2',
    title: 'Dönüşüm odaklı kurgu',
    description:
      'Sadece güzel görünen ekranlar değil; form, WhatsApp ve reklam trafiğini daha iyi dönüştüren stratejik sayfa akışları hazırlıyoruz.',
  },
  {
    id: 'signal-3',
    title: 'Tek elden büyüme',
    description:
      'Web tasarımı, kreatif, Meta Ads, sosyal medya reklamcılığı ve marka dili tek bir büyüme sistemi olarak birlikte çalışıyor.',
  },
];

export const clientLogos = [];

export const testimonials: Testimonial[] = [];

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'design-web',
    title: 'Tasarım & Web',
    items: [
      {
        id: 'website-design',
        title: 'Web Site Tasarımı',
        icon: 'monitor-smartphone',
        description:
          'Markanızı daha güvenilir ve daha pahalı algılatan, kullanıcı kararını hızlandıran premium web deneyimleri kuruyoruz.',
        benefits: ['İlk izlenimde güven artışı', 'Mobilde hızlı ve akıcı deneyim', 'Başvuru kararını hızlandıran içerik akışı'],
      },
      {
        id: 'landing-system',
        title: 'Landing Page & Funnel',
        icon: 'workflow',
        description:
          'Reklam trafiğini boşa harcamayan, teklif ve WhatsApp aksiyonunu netleştiren dönüşüm odaklı landing sistemleri oluşturuyoruz.',
        benefits: ['Yüksek niyetli trafiği daha iyi dönüştürme', 'Form + WhatsApp + teklif entegrasyonu', 'Tek amaçlı sayfa mimarisi'],
      },
      {
        id: 'creative-direction',
        title: 'Art Direction & Kreatif',
        icon: 'palette',
        description:
          'Markanızın daha premium ve daha güvenilir görünmesi için görsel dili, metin tonunu ve kreatif sistemi tek standartta topluyoruz.',
        benefits: ['Daha güçlü marka algısı', 'Tutarlı kreatif üretim disiplini', 'Reklam ve web arasında tek dil'],
      },
    ],
  },
  {
    id: 'media-growth',
    title: 'Medya & Büyüme',
    items: [
      {
        id: 'meta-ads',
        title: 'Meta Ads Yönetimi',
        icon: 'megaphone',
        description:
          'Instagram ve Facebook reklamlarında doğru kitle + doğru kreatif + doğru teklif yapısını kurarak daha fazla talep akışı sağlıyoruz.',
        benefits: ['Boşa giden bütçeyi azaltan kurgu', 'Talep odaklı kampanya yapısı', 'Düzenli optimizasyon ve görünür raporlama'],
      },
      {
        id: 'social-media-ads',
        title: 'Sosyal Medya Reklamcılığı',
        icon: 'messages-square',
        description:
          'Sosyal medya görünürlüğünü gerçek başvuru ve satış akışına çevirmek için kampanya dili, kreatif seti ve hedefleme yapısını birlikte kurguluyoruz.',
        benefits: ['Reels + story + static reklam setleri', 'Dönüşüm odaklı metin ve kreatif', 'Algı ve performansı birlikte büyüten sistem'],
      },
      {
        id: 'search-growth',
        title: 'Google Ads & Arama',
        icon: 'search',
        description:
          'Satın alma niyeti yüksek aramalarda görünürlük kurup kullanıcıyı doğru landing sayfaya taşıyarak daha kaliteli lead üretiyoruz.',
        benefits: ['Yüksek niyetli arama kampanyaları', 'Lead kalitesi optimizasyonu', 'Landing ve ölçümleme uyumu'],
      },
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    title: 'Keşif',
    description: 'Markanızın hedefini, satış modelini, mevcut görünümünü ve dijitalde vermek istediğiniz algıyı birlikte netleştiriyoruz.',
  },
  {
    id: 'strategy',
    title: 'Strateji',
    description: 'Sayfa mimarisi, hizmet öncelikleri, reklam altyapısı ve mesaj dili tek bir büyüme planında birleşiyor.',
  },
  {
    id: 'design-build',
    title: 'Tasarım & Build',
    description: 'Premium arayüz, güçlü copywriting ve dönüşüm odaklı kullanıcı akışını canlıya hazır hale getiriyoruz.',
  },
  {
    id: 'scale',
    title: 'Ölçekleme',
    description: 'Yayın sonrası kampanya, kreatif ve sayfa performansını izleyip markayı daha güçlü bir büyüme ritmine taşıyoruz.',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'loli',
    title: 'Loli Nail Studio',
    category: 'Beauty',
    summary:
      'Butik güzellik hizmetini daha premium gösteren ve rezervasyon kararını hızlandıran satış odaklı dijital vitrin.',
    metric: 'Soft Luxury',
    image: '/loli-logo.jpg',
    problem: 'Marka estetiği güçlüydü ancak dijitalde premium algı ve net rezervasyon akışı yeterince belirgin değildi.',
    solution: 'Hizmet hiyerarşisi, rezervasyon CTA yerleşimi ve görsel dil soft-luxury marka standardına göre yeniden kurgulandı.',
    outcome: 'İlk izlenim güçlendi, hizmet karar süresi kısaldı ve rezervasyon niyeti daha net şekilde yönlendi.',
    services: ['Web Site Tasarımı', 'Landing Kurgusu', 'Kreatif Sistem'],
    highlights: ['Markaya uygun sıcak tonlar', 'Hizmetleri net ayıran yapı', 'Rezervasyon odaklı çağrılar', 'Premium görünüm'],
  },
  {
    id: 'master',
    title: 'Master Service',
    category: 'Automotive',
    summary:
      'Teknik uzmanlığı daha otoriter bir servis deneyimine dönüştüren, güven ve bilgi hiyerarşisini merkeze alan kurgu.',
    metric: 'Technical Trust',
    image: '/master-logo.png',
    problem: 'Teknik yetkinlik yüksek olmasına rağmen dijitalde servis otoritesini net hissettiren bilgi mimarisi eksikti.',
    solution: 'Kontrast, bilgi sıralaması ve hızlı iletişim katmanları kurumsal servis güveni odağında yeniden yapılandırıldı.',
    outcome: 'Kullanıcı doğru bilgiye daha hızlı ulaştı, iletişim adımı netleşti ve yetkili servis algısı daha güçlü hale geldi.',
    services: ['Kurumsal Web', 'Bilgi Mimarisi', 'Hızlı İletişim Akışı'],
    highlights: ['Yetkili servis otoritesi', 'Güçlü kontrastlı görünüm', 'Hızlı iletişim akışı', 'Bilgi odaklı yapı'],
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Launch',
    priceTRY: '15.000 ₺',
    priceLabel: 'Başlangıç',
    description:
      'Dijitalde profesyonel ve güven veren bir başlangıç yapmak isteyen markalar için hızlı yayına alınan temel premium paket.',
    features: [
      'Tek sayfa premium web tasarımı',
      'Net hizmet hiyerarşisi ve güçlü ilk izlenim',
      'WhatsApp veya form odaklı iletişim akışı',
      'Mobil uyumlu hızlı geliştirme',
      'Hızlı yayına alma',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Suite',
    priceTRY: '25.000 ₺',
    priceLabel: 'Önerilen',
    description:
      'Web, landing ve reklam katmanını birlikte kurarak daha düzenli talep akışı hedefleyen markalar için en dengeli model.',
    recommended: true,
    features: [
      'Premium web veya landing kurulumu',
      'Meta Ads kampanya altyapısı',
      'Kreatif yön ve reklam mesaj sistemi',
      'Dönüşüm takibi + optimizasyon',
      'Aylık performans raporlama',
    ],
  },
  {
    id: 'signature',
    name: 'Signature Partner',
    priceTRY: '35.000 ₺',
    priceLabel: 'Üst Segment',
    description:
      'Tasarım, reklam ve büyüme katmanını sürdürülebilir biçimde yönetmek isteyen markalar için partner odaklı yoğun çalışma modeli.',
    features: [
      'Çoklu sayfa veya çoklu landing sistemi',
      'Meta + Google Ads yönetimi',
      'Sürekli kreatif optimizasyon',
      'Haftalık strateji takibi',
      'Öncelikli iletişim ve destek',
    ],
  },
];

export const faqs: FaqItem[] = [
  {
    id: 'f1',
    question: 'Hangi markalarla çalışıyorsunuz?',
    answer:
      'Öncelikli olarak güzellik, hizmet ve premium algı kurmak isteyen yerel işletmelerle çalışıyoruz. Uygun olmayan projelerde sürecin başında net yönlendirme yapıyoruz.',
  },
  {
    id: 'f2',
    question: 'Sadece web site tasarımı alabilir miyim?',
    answer:
      'Evet. Yalnızca web site, yalnızca reklam ya da web + reklam birlikte olacak şekilde ihtiyacınıza göre ilerliyoruz.',
  },
  {
    id: 'f3',
    question: 'Reklam bütçesi paket ücretine dahil mi?',
    answer:
      'Hayır. Paket bedeli hizmet yönetimi ve üretim kapsamıdır. Reklam bütçesi Meta/Google platformlarına ayrı ödenir ve stratejiye göre birlikte planlanır.',
  },
  {
    id: 'f4',
    question: 'Teslim süresi neye göre değişiyor?',
    answer:
      'Kapsam, içerik yoğunluğu ve reklam altyapısına göre değişir. Keşif sonrası net takvim paylaşır, adımları o plana göre ilerletiriz.',
  },
  {
    id: 'f5',
    question: 'Uzaktan çalışıyor musunuz?',
    answer:
      'Evet. Çalışma modelimiz tamamen dijitaldir. Toplantılar, revize ve rapor süreçleri online yürütülür.',
  },
  {
    id: 'f6',
    question: 'Sonuçlar ne kadar sürede görünür?',
    answer:
      'Web tarafında etki yayına alındıktan sonra hemen hissedilir. Reklam tarafında sağlıklı optimizasyon için genellikle ilk 2-4 hafta veri toplama ve iyileştirme süreci gerekir.',
  },
  {
    id: 'f7',
    question: 'Revize süreci nasıl ilerliyor?',
    answer:
      'Süreç başında kapsamı net tanımlarız. Her aşamada kontrollü revize döngüsüyle ilerler, belirsiz ve uzayan revize kaosunu engelleriz.',
  },
  {
    id: 'f8',
    question: 'Fiyatlandırma nasıl belirleniyor?',
    answer:
      'Paketler başlangıç çerçevesidir. Nihai teklif; sayfa kapsamı, reklam yoğunluğu, kreatif üretim ve teknik ihtiyaçlara göre netleşir.',
  },
];

export const blogPosts: BlogPost[] = [];

export const contactInfo: ContactInfo = {
  phone: '0546 628 71 11',
  email: 'lunaramedya@gmail.com',
  whatsapp: '905466287111',
  instagramHandle: '@lunaramedya',
  instagramUrl: 'https://instagram.com/lunaramedya',
};

export const socialLinks: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/lunaramedya' },
];

export const legalLinks = [
  { id: 'kvkk', label: 'KVKK', href: '#' },
  { id: 'privacy', label: 'Gizlilik', href: '#' },
];
