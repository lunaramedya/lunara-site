import {
  blogPosts,
  caseStudies,
  contactInfo,
  creatorLayerItems,
  faqs,
  growthStages,
  legalLinks,
  navItems,
  pricingPlans,
  problemItems,
  processSteps,
  socialLinks,
  stats,
  systemSteps,
} from './siteData';

export const defaultContent = {
  navItems,
  stats,
  problemItems,
  systemSteps,
  growthStages,
  creatorLayerItems,
  processSteps,
  caseStudies,
  pricingPlans,
  faqs,
  blogPosts,
  contactInfo,
  socialLinks,
  legalLinks,
  cta: {
    primary: 'Growth Fit Görüşmesi Planla',
    secondary: "WhatsApp'tan Hızlı Ön Değerlendirme",
  },
  hero: {
    badge: 'Boutique Growth Operator',
    title: 'Reklam bütçenizi görünürlüğe değil,',
    highlight: 'müşteri akışına çeviren sistemi kuruyoruz.',
    subtitle:
      'Lunara Medya; Meta Ads, dönüşüm odaklı landing sayfalar ve creator-performans katmanını tek operasyonda birleştirir. Hedefimiz net: daha nitelikli talep, daha güçlü güven, daha yüksek kapanış potansiyeli.',
  },
  problemSection: {
    badge: 'Gerçek Problem',
    title: 'Neden iyi işletmeler dijitalde zayıf sonuç alıyor?',
    subtitle:
      'Çoğu marka reklamı artırıyor ama sistemi kurmuyor. Sonuç: yükselen maliyet, düşük lead kalitesi ve dağınık satış akışı.',
    cta: 'Sistemsiz trafiği bırak, talep sistemini kuralım.',
  },
  systemSection: {
    badge: 'Demand Operating System',
    title: 'Hizmet listesi değil, işletilen büyüme modeli.',
    subtitle:
      'Reklamdan müşteriye uzanan talep hattını tek bir operasyon disipliniyle kuruyor, ölçüyor ve iyileştiriyoruz.',
    cta: 'Sadece kampanya değil, işletilen büyüme altyapısı istiyorum.',
  },
  servicesSection: {
    badge: 'Growth Stages',
    title: 'Büyüme Aşamaları',
    subtitle:
      'Her marka aynı noktadan başlamaz. Hangi aşamada olduğunuzu netleyip doğru yatırımla ilerleriz.',
    cta: 'Markanızın doğru aşamasını birlikte netleştirelim.',
  },
  creatorSection: {
    badge: 'Creator Performance Layer',
    title: 'Creator yaklaşımını içerik değil, performans katmanı olarak kuruyoruz.',
    subtitle:
      'Bu yapı, reklam performansını artırmak için kontrollü biçimde geliştirdiğimiz stratejik bir katmandır.',
    honestyTitle: 'Dürüst not',
    honestyText:
      'Geniş ölçekli creator ağı iddiası sunmuyoruz. Bu katmanı seçili projelerde kontrollü şekilde devreye alıyor ve veriye göre büyütüyoruz.',
    cta: 'Creator katmanını performans için nasıl konumlarız, birlikte değerlendirelim.',
  },
  casesSection: {
    badge: 'Vaka Hikayeleri',
    title: 'Tasarım değil, ticari etki odaklı dönüşümler.',
    subtitle:
      'Metrik uydurmadan; karar akışı, güven algısı ve dönüşüm hazırlığını nasıl güçlendirdiğimizi gösteriyoruz.',
  },
  packagesSection: {
    badge: 'Çalışma Modelleri',
    title: 'Hizmet değil, sonuç odaklı modeller',
    subtitle:
      'Paketler başlangıç çerçevesidir. Kapsam, hedef ve operasyon ihtiyacına göre keşif sonrasında netleştirilir.',
    footnote:
      'Paket bedelleri hizmet kapsamıdır. Reklam bütçesi platformlara ayrıca ödenir.',
  },
  processSection: {
    badge: '4 Adımda Operasyon',
    title: 'Planlı, ölçülebilir ve karar odaklı ilerleme',
    subtitle:
      'Dağınık revize döngüleri yerine, net teslim ve düzenli optimizasyon ritmiyle ilerliyoruz.',
  },
  faqSection: {
    badge: 'SSS',
    title: 'Karar öncesi en kritik sorular',
    subtitle: 'Çalışma modeli, bütçe, süre ve beklenti yönetimiyle ilgili net cevaplar.',
  },
  contactSection: {
    badge: 'Growth Fit Formu',
    title: 'Markanız için gelir odaklı büyüme çerçevesini çıkaralım',
    subtitle:
      'Formu doldurun, size uygun modeli ve ilk 90 günün operasyon planını net biçimde paylaşalım.',
    formBadge: 'Project Intake',
    formTitle: 'Birkaç net bilgi bırakın,',
    formHighlight: 'doğru modeli birlikte belirleyelim.',
    directBadge: 'Direct Line',
    directTitle: 'Hızlı değerlendirme,',
    directSubtitle: 'net yönlendirme.',
  },
  finalCtaSection: {
    badge: 'Karar Noktası',
    title: 'Markanız için growth operasyonunu başlatmaya hazırsanız, şimdi konuşalım.',
    subtitle:
      'Yüzeysel ajans hizmeti yerine, talep ve müşteri akışı kuran bir sistem istiyorsanız ilk adımı birlikte atalım.',
  },
  contactFormOptions: {
    sectorOptions: [
      'Güzellik / Estetik',
      'Klinik / Sağlık Hizmeti',
      'Premium Hizmet İşletmesi',
      'Kişisel Marka',
      'Diğer',
    ],
    serviceOptions: ['Foundation Launch', 'Demand Engine', 'Growth Operator', 'Özel Kapsam Değerlendirme'],
    budgetOptions: [
      'Henüz belirlenmedi',
      '15.000 TL altı',
      '15.000 TL - 30.000 TL',
      '30.000 TL - 60.000 TL',
      '60.000 TL ve üzeri',
    ],
    goalOptions: ['Daha fazla lead', 'Daha fazla randevu', 'Satış dönüşümünü artırma', 'Premium marka otoritesi'],
    creatorSupportOptions: ['Evet, değerlendirilebilir', 'Hayır, şu an gerek yok', 'Stratejiye göre karar verelim'],
  },
  footer: {
    description:
      'Lunara Medya, premium hizmet markaları için reklam, landing ve creator-performans katmanını birleştirerek talep sistemi kurar.',
    ctaLabel: 'Growth Fit Görüşmesi Planla',
  },
};

export type SiteContent = typeof defaultContent;
