import type {
  BlogPost,
  CaseStudy,
  ContactInfo,
  CreatorLayerItem,
  FaqItem,
  GrowthStage,
  NavItem,
  PricingPlan,
  ProblemItem,
  ProcessStep,
  SocialLink,
  SystemStep,
} from '../types/site';

export const navItems: NavItem[] = [
  { id: 'system', label: 'Sistem', href: '#system' },
  { id: 'stages', label: 'Büyüme Aşamaları', href: '#stages' },
  { id: 'cases', label: 'Vaka Hikayeleri', href: '#cases' },
  { id: 'packages', label: 'Modeller', href: '#packages' },
  { id: 'faq', label: 'SSS', href: '#faq' },
  { id: 'contact', label: 'İletişim', href: '#contact' },
];

export const stats = [
  'Beauty ve premium hizmet odaklı uzmanlık',
  'Reklam + landing + kreatif tek operasyonda',
  'Butik ekip, yüksek temas, net süreç',
  'Abartısız vaat, ölçülebilir ilerleme',
];

export const problemItems: ProblemItem[] = [
  {
    id: 'problem-traffic',
    title: 'Reklam var, dönüşüm hattı yok',
    description:
      'Trafik geliyor ama teklif, sayfa ve aksiyon akışı birleşmediği için bütçe görünürlüğe gidiyor.',
  },
  {
    id: 'problem-site',
    title: 'Site var, karar akışı yok',
    description:
      'Görünüm güçlü olsa da kullanıcıyı net başvuru adımına taşıyan ticari yapı eksik kalıyor.',
  },
  {
    id: 'problem-content',
    title: 'İçerik var, performans mantığı yok',
    description:
      'Kreatif üretimi kampanya hedeflerine bağlanmadığında lead kalitesi ve maliyet dengesi bozuluyor.',
  },
  {
    id: 'problem-consistency',
    title: 'Mesaj dağınık, güven zayıf',
    description:
      'Landing, reklam ve sosyal medya farklı dil konuştuğunda premium algı parçalanıyor.',
  },
];

export const systemSteps: SystemStep[] = [
  {
    id: 'offer-clarity',
    title: 'Offer Clarity',
    description:
      'Kime ne teklif ettiğinizi, neden sizi seçmeleri gerektiğini ve hangi aksiyonu almalarını istediğinizi netleştiririz.',
  },
  {
    id: 'creative-engine',
    title: 'Paid Creative Engine',
    description:
      'Reklam için tasarlanmış kreatif ve mesaj setleri kurar, test edilebilir bir üretim disiplini oluştururuz.',
  },
  {
    id: 'conversion-surface',
    title: 'Conversion Surface',
    description:
      'Landing sayfaları, form ve WhatsApp akışını tek hedefe bağlayarak karar süresini kısaltırız.',
  },
  {
    id: 'optimization-loop',
    title: 'Optimization Loop',
    description:
      'Kampanya verisiyle mesajı, kreatifi ve sayfayı düzenli olarak günceller, düşük etkili parçaları ayıklarız.',
  },
];

export const growthStages: GrowthStage[] = [
  {
    id: 'foundation-authority',
    title: 'Aşama 1: Foundation Authority',
    bestFor: 'Dijitalde güven ve premium konumu hızlıca güçlendirmek isteyen markalar.',
    build:
      'Konumlama netliği, teklif dili ve web/landing omurgasıyla satışa hazır bir temel kurulur.',
    outcome: 'Daha güçlü ilk izlenim ve daha net başvuru niyeti.',
    points: ['Konumlama netliği', 'Premium web/landing omurgası', 'Net aksiyon akışı'],
  },
  {
    id: 'demand-engine',
    title: 'Aşama 2: Demand Engine',
    bestFor: 'Düzenli talep akışı oluşturmak isteyen işletmeler.',
    build:
      'Meta Ads altyapısı, performans kreatif sistemi ve dönüşüm odaklı sayfalar birlikte işletilir.',
    outcome: 'Daha nitelikli lead akışı ve daha sağlıklı kampanya verimi.',
    points: ['Meta Ads yapısı', 'Kreatif test sistemi', 'Landing dönüşüm mimarisi'],
  },
  {
    id: 'scale-operations',
    title: 'Aşama 3: Scale Operations',
    bestFor: 'Sürekli optimizasyonla ölçeklenmek isteyen markalar.',
    build:
      'Aylık büyüme operasyonu, test ritmi, raporlama ve karar mekanizması tek modelde yönetilir.',
    outcome: 'Sürdürülebilir performans disiplini ve öngörülebilir büyüme zemini.',
    points: ['Aylık growth operasyonu', 'Karar odaklı raporlama', 'Sürekli iyileştirme döngüsü'],
  },
];

export const creatorLayerItems: CreatorLayerItem[] = [
  {
    id: 'creator-match',
    title: 'Persona Match',
    description: 'Sektör ve teklif diline uygun creator profilleriyle mesaj güvenini artıran eşleşmeler kurgulanır.',
  },
  {
    id: 'performance-script',
    title: 'Performance Script',
    description: 'Hook, teklif ve açı varyasyonları reklam performansına göre yazılır; içerik üretim öncesi test mantığıyla planlanır.',
  },
  {
    id: 'paid-ready-production',
    title: 'Paid-Ready Production',
    description: 'Üretilen içerik, doğrudan reklam yerleşimlerinde çalışacak uzunluk, tempo ve format disipliniyle hazırlanır.',
  },
  {
    id: 'feedback-loop',
    title: 'Feedback Loop',
    description: 'Kampanya verisine göre creator briefleri güncellenir; içerik üretimi performans döngüsüne bağlanır.',
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    title: 'Discovery',
    description: 'Hedef, teklif, kitle ve mevcut performans gerçekliği netleştirilir.',
  },
  {
    id: 'system-design',
    title: 'System Design',
    description: 'Mesaj, kreatif, kampanya ve landing yapısı tek plana bağlanır.',
  },
  {
    id: 'build-launch',
    title: 'Build & Launch',
    description: 'Varlıklar yayına alınır, ölçüm altyapısı aktif edilir.',
  },
  {
    id: 'optimize-scale',
    title: 'Optimize & Scale',
    description: 'Veriye göre düşük etkili parçalar güçlendirilir, model ölçeklenir.',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'loli',
    title: 'Loli Nail Studio',
    category: 'Beauty',
    challenge:
      'Marka estetiği güçlüydü ancak dijitalde premium algı ve rezervasyona giden karar akışı yeterince net değildi.',
    changed:
      'Hizmet hiyerarşisi, teklif dili ve randevu aksiyonları conversion mantığıyla yeniden kurgulandı.',
    impact:
      'İlk izlenim premium seviyede tutarlı hale geldi; kullanıcıların rezervasyon niyeti daha net yönlendirildi.',
    image: '/loli-logo.jpg',
  },
  {
    id: 'master',
    title: 'Master Service',
    category: 'Automotive',
    challenge:
      'Teknik yetkinlik güçlü olmasına rağmen dijitalde servis otoritesini ve hızlı aksiyon akışını hissettiren yapı eksikti.',
    changed:
      'Bilgi mimarisi, iletişim katmanları ve görsel kontrast servis güveni merkezinde yeniden inşa edildi.',
    impact:
      'Kullanıcılar doğru bilgiye daha hızlı ulaştı; iletişim adımı daha az sürtünme ile tamamlanır hale geldi.',
    image: '/master-logo.png',
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'foundation',
    name: 'Foundation Launch',
    priceTRY: '15.000 ₺',
    badge: 'Başlangıç Modeli',
    bestFor: 'Dijital temelini premium bir yapıda toplamak isteyen işletmeler.',
    description: 'Güven veren dijital temel ve net aksiyon zemini kurar.',
    outcome: 'Güçlü ilk izlenim + daha net başvuru akışı',
    includes: [
      'Premium tek sayfa web veya landing kurulumu',
      'Mesaj ve teklif hiyerarşisi',
      'Form/WhatsApp aksiyon akışı',
      'Mobil uyum ve hızlı yayına alma',
    ],
  },
  {
    id: 'demand',
    name: 'Demand Engine',
    priceTRY: '25.000 ₺',
    badge: 'Önerilen Model',
    bestFor: 'Reklam + landing sistemini birlikte çalıştırmak isteyen markalar.',
    description: 'Talep üretimi için reklam ve dönüşüm katmanını birlikte işletir.',
    outcome: 'Daha nitelikli lead akışı + daha sağlıklı kampanya verimi',
    includes: [
      'Landing + Meta Ads başlangıç altyapısı',
      'Performans kreatif mesaj seti',
      'Dönüşüm takibi ve ilk optimizasyon döngüsü',
      'Aylık performans değerlendirmesi',
    ],
    recommended: true,
  },
  {
    id: 'operator',
    name: 'Growth Operator',
    priceTRY: '35.000 ₺',
    badge: 'Operasyon Modeli',
    bestFor: 'Sürekli test ve optimizasyonla ölçeklenmek isteyen işletmeler.',
    description: 'Aylık growth operasyonu ile performans disiplini kurar.',
    outcome: 'Sürdürülebilir büyüme ritmi + karar odaklı optimizasyon',
    includes: [
      'Meta Ads aylık yönetim ve optimizasyon',
      'Kreatif test planı ve iterasyon',
      'Landing performans iyileştirmeleri',
      'Haftalık karar toplantısı ve öncelikli destek',
    ],
  },
];

export const faqs: FaqItem[] = [
  {
    id: 'f1',
    question: 'Kimlerle çalışıyorsunuz?',
    answer:
      'Önceliğimiz beauty, estetik, premium hizmet ve kişisel marka segmentleri. Her başvuruda önce proje uyumunu birlikte değerlendiriyoruz.',
  },
  {
    id: 'f2',
    question: 'Sadece web hizmeti alabilir miyim?',
    answer:
      'Evet. Ancak en güçlü etki web + reklam + dönüşüm akışı birlikte kurgulandığında oluşur.',
  },
  {
    id: 'f3',
    question: 'Reklam bütçesi paket ücretine dahil mi?',
    answer:
      'Hayır. Paket bedelleri hizmet kapsamıdır. Reklam bütçesi Meta platformlarına ayrı ödenir.',
  },
  {
    id: 'f4',
    question: 'Yayın ve teslim süresi neye göre değişiyor?',
    answer:
      'Kapsam, içerik hazır olma düzeyi ve reklam altyapısına göre değişir. Keşif sonrası net takvim paylaşırız.',
  },
  {
    id: 'f5',
    question: 'Sonuçlar ne zaman görünmeye başlar?',
    answer:
      'Web tarafındaki etki yayına yakın hissedilir. Reklam tarafında sağlıklı yorum için genelde 2-6 hafta veri döngüsü gerekir.',
  },
  {
    id: 'f6',
    question: 'Uzaktan çalışıyor musunuz?',
    answer:
      'Evet. Süreçlerimizi tamamen dijital ve planlı şekilde yönetiyoruz.',
  },
  {
    id: 'f7',
    question: 'Fiyatlandırma nasıl netleşiyor?',
    answer:
      'Paketler başlangıç çerçevesidir. Nihai teklif; kapsam, kreatif yoğunluğu ve operasyon ihtiyacına göre netleştirilir.',
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
