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
  { id: 'contact', label: 'İletişim', href: '#contact' },
];

export const stats = [
  'Dijital büyümenin yeni adresi',
  'Premium web tasarımı',
  'Meta Ads ve sosyal medya reklamcılığı',
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
          'Markanızın seviyesini ilk bakışta hissettiren, hızlı açılan ve premium görünen kurumsal ya da landing page deneyimleri tasarlıyoruz.',
        benefits: ['Mobilde kusursuz deneyim', 'Markaya özel UI dili', 'Yüksek algı oluşturan sayfa kompozisyonu'],
      },
      {
        id: 'landing-system',
        title: 'Landing Page & Funnel',
        icon: 'workflow',
        description:
          'Reklam trafiğini boşa harcamayan, başvuru ve WhatsApp aksiyonlarını net biçimde yöneten dönüşüm odaklı sayfa yapıları kuruyoruz.',
        benefits: ['Form ve WhatsApp entegrasyonu', 'Dönüşüm odaklı akışlar', 'Tek teklif yerine net talep toplama'],
      },
      {
        id: 'creative-direction',
        title: 'Art Direction & Kreatif',
        icon: 'palette',
        description:
          'Renk, tipografi, görsel dil ve metin tonunu tek bir premium agency standardında birleştirerek markanızı daha ayırt edici hale getiriyoruz.',
        benefits: ['Markaya uygun görsel yön', 'Tutarlı kreatif sistem', 'Premium algı oluşturan detaylar'],
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
          'Instagram ve Facebook reklamlarında hedef kitlenizi doğru mesajla yakalayan, satış ve talep üreten kampanya sistemleri kuruyoruz.',
        benefits: ['Hedef kitle ve kreatif uyumu', 'Performans odaklı reklam kurgusu', 'Düzenli optimizasyon ve raporlama'],
      },
      {
        id: 'social-media-ads',
        title: 'Sosyal Medya Reklamcılığı',
        icon: 'messages-square',
        description:
          'Kreatif üretim, kampanya dili ve reklam mesajını birlikte kurgulayarak sosyal medyayı görünürlükten gerçek büyümeye taşıyoruz.',
        benefits: ['Kampanya odaklı içerik dili', 'Reels, story ve static kreatifler', 'Marka algısını güçlendiren reklam setleri'],
      },
      {
        id: 'search-growth',
        title: 'Google Ads & Arama',
        icon: 'search',
        description:
          'Arama niyeti yüksek kullanıcıları doğru landing yapısına taşıyarak daha kaliteli talep ve daha güçlü dönüşüm akışı oluşturuyoruz.',
        benefits: ['Arama kampanyaları', 'Lead kalitesi optimizasyonu', 'Landing ile uyumlu ölçümleme'],
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
      'Butik güzellik hizmetini daha rafine gösteren, rezervasyon kararını hızlandıran ve sosyal medya estetiğiyle uyumlu dijital sunum yaklaşımı.',
    metric: 'Soft Luxury',
    image: '/loli-logo.jpg',
    highlights: ['Markaya uygun sıcak tonlar', 'Hizmetleri net ayıran yapı', 'Rezervasyon odaklı çağrılar', 'Premium görünüm'],
  },
  {
    id: 'master',
    title: 'Master Service',
    category: 'Automotive',
    summary:
      'Teknik uzmanlığı güçlü kontrast, kurumsal güven ve servis odaklı bilgi hiyerarşisiyle daha otoriter ve daha net bir dijital yapıya taşıyan kurgu.',
    metric: 'Technical Trust',
    image: '/master-logo.png',
    highlights: ['Yetkili servis otoritesi', 'Güçlü kontrastlı görünüm', 'Hızlı iletişim akışı', 'Bilgi odaklı yapı'],
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Launch',
    priceTRY: '15.000 ₺',
    priceLabel: 'Başlangıç',
    description: 'Yeni bir marka vitrini kurmak ya da tek sayfalık güçlü bir lansman sitesiyle dijitalde daha net görünmek isteyenler için.',
    features: ['Tek sayfa premium web tasarımı', 'Temel içerik kurgusu', 'WhatsApp veya form entegrasyonu', 'Responsive geliştirme'],
  },
  {
    id: 'growth',
    name: 'Growth Suite',
    priceTRY: '25.000 ₺',
    priceLabel: 'Önerilen',
    description: 'Web tasarımı ile birlikte reklam ve dönüşüm sistemini aynı anda kurmak isteyen markalar için en dengeli model.',
    recommended: true,
    features: [
      'Premium site veya landing kurulumu',
      'Meta Ads kampanya kurgusu',
      'Sosyal medya reklam kreatif yönü',
      'Dönüşüm takibi ve optimizasyon',
      'Aylık performans raporu',
    ],
  },
  {
    id: 'signature',
    name: 'Signature Partner',
    priceTRY: '35.000 ₺',
    priceLabel: 'Üst Segment',
    description: 'Tasarım, performans ve büyüme katmanını daha yoğun ve sürekli yönetmek isteyen markalar için premium partner modeli.',
    features: [
      'Çoklu landing veya özel sayfa sistemi',
      'Meta + Google Ads yönetimi',
      'Kreatif ve içerik optimizasyonu',
      'Haftalık strateji takibi',
      'Öncelikli destek',
    ],
  },
];

export const faqs: FaqItem[] = [
  {
    id: 'f1',
    question: 'Hangi markalarla çalışıyorsunuz?',
    answer:
      'Hizmet, güzellik, otomotiv ve dijital görünümünü daha premium hale getirmek isteyen farklı sektörlerdeki markalarla çalışıyoruz.',
  },
  {
    id: 'f2',
    question: 'Sadece web site tasarımı alabilir miyim?',
    answer:
      'Evet. Yalnızca web site tasarımı, yalnızca reklam yönetimi ya da ikisini aynı sistem içinde kapsayan bir modelle ilerleyebiliriz.',
  },
  {
    id: 'f3',
    question: 'Meta Ads yönetimi de sunuyor musunuz?',
    answer:
      'Evet. Meta Ads tarafında hedefleme, kreatif yönü, reklam metni, ölçümleme ve optimizasyon dahil uçtan uca yönetim sunuyoruz.',
  },
  {
    id: 'f4',
    question: 'Teslim süresi neye göre değişiyor?',
    answer:
      'Sayfa kapsamı, içerik yoğunluğu, reklam altyapısı ve özel geliştirme ihtiyacına göre süre değişir. Çoğu proje keşif sonrası net takvimle başlar.',
  },
  {
    id: 'f5',
    question: 'Uzaktan çalışıyor musunuz?',
    answer:
      'Evet. Şu anda sabit bir mağaza veya ofis lokasyonundan bağımsız, tamamen dijital ve esnek şekilde proje yürütüyoruz.',
  },
  {
    id: 'f6',
    question: 'Fiyatlandırma nasıl belirleniyor?',
    answer:
      'Paketler başlangıç çerçevesidir. Nihai kapsam; tasarım yoğunluğu, reklam bütçesi, sayfa sayısı ve ek geliştirme ihtiyaçlarına göre netleşir.',
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
