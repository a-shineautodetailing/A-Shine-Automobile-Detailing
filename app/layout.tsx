import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const viewport: Viewport = {
  themeColor: '#E31B23',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.a-shineautomobiledetailing.ca'),
  title: 'Mobile Interior Car Detailing Kitchener-Waterloo | A-Shine Auto',
  description:
    'Top-rated mobile interior car detailing in Kitchener, Waterloo, Cambridge & Guelph. Deep steam extraction, winter salt removal, seat shampooing & truck detailing. We come to you — 5.0★ rated. Book today!',
  keywords: [
    'mobile car detailing Kitchener',
    'car detailing Waterloo',
    'mobile auto detailing Kitchener-Waterloo',
    'interior car shampooing Kitchener',
    'steam car detailing Kitchener',
    'salt stain removal car interior',
    'pet hair removal car detailing',
    'semi truck detailing Kitchener',
    'commercial truck cab detailing Ontario',
    'mobile car detailing Cambridge ON',
    'car detailing Guelph',
    'A-Shine Auto Mobile Detailing',
  ],
  authors: [{ name: 'A-Shine Auto Mobile Detailing', url: 'https://www.a-shineautomobiledetailing.ca' }],
  creator: 'A-Shine Auto Mobile Detailing',
  publisher: 'A-Shine Auto Mobile Detailing',
  alternates: {
    canonical: 'https://www.a-shineautomobiledetailing.ca',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Mobile Interior Car Detailing Kitchener-Waterloo | A-Shine Auto',
    description:
      'Professional mobile interior car detailing in Kitchener-Waterloo. Steam cleaning, salt & stain extraction, seat shampooing — we come to you. 5.0★ rated.',
    url: 'https://www.a-shineautomobiledetailing.ca',
    siteName: 'A-Shine Auto Mobile Detailing',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: 'https://www.a-shineautomobiledetailing.ca/porsche-hero.png',
        width: 1200,
        height: 630,
        alt: 'A-Shine Auto Mobile Detailing in Kitchener-Waterloo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile Interior Car Detailing Kitchener-Waterloo | A-Shine Auto',
    description:
      'Mobile interior car detailing in Kitchener-Waterloo. Deep steam cleaning, winter salt removal, and shampooing right in your driveway. 5.0★ rated.',
    images: ['https://www.a-shineautomobiledetailing.ca/porsche-hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['AutoDetailingService', 'AutomotiveBusiness', 'LocalBusiness'],
    '@id': 'https://www.a-shineautomobiledetailing.ca/#localbusiness',
    name: 'A-Shine Auto Mobile Detailing',
    alternateName: ['A-Shine Auto Detailing', 'A-Shine Detailing Kitchener'],
    url: 'https://www.a-shineautomobiledetailing.ca',
    telephone: '+1-519-729-5856',
    email: 'manager@a-shineautomobiledetailing.ca',
    image: 'https://www.a-shineautomobiledetailing.ca/porsche-hero.png',
    logo: 'https://www.a-shineautomobiledetailing.ca/logo.png',
    priceRange: '$100–$250 CAD',
    currenciesAccepted: 'CAD',
    paymentAccepted: 'Cash, Credit Card, Debit Card, Interac e-Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '54 Woodbine Avenue',
      addressLocality: 'Kitchener',
      addressRegion: 'ON',
      postalCode: 'N2R 1V1',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.4077,
      longitude: -80.4578,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Kitchener',
        sameAs: 'https://en.wikipedia.org/wiki/Kitchener,_Ontario',
      },
      {
        '@type': 'City',
        name: 'Waterloo',
        sameAs: 'https://en.wikipedia.org/wiki/Waterloo,_Ontario',
      },
      {
        '@type': 'City',
        name: 'Cambridge',
        sameAs: 'https://en.wikipedia.org/wiki/Cambridge,_Ontario',
      },
      {
        '@type': 'City',
        name: 'Guelph',
        sameAs: 'https://en.wikipedia.org/wiki/Guelph',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Region of Waterloo',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '420',
      reviewCount: '420',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mobile Interior Car Detailing Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Small Car Full Interior Shampoo & Detailing',
          description: 'Sedans, coupes & compact cars. Full seat shampooing, carpet steam extraction, salt removal, dashboard & trunk clean.',
          price: '100.00',
          priceCurrency: 'CAD',
        },
        {
          '@type': 'Offer',
          name: 'SUV (5 Seats) Full Interior Shampoo & Detailing',
          description: '5-Seater SUVs, crossovers & pickups. Deep seat shampooing, carpet extraction, console & cargo detailing.',
          price: '125.00',
          priceCurrency: 'CAD',
        },
        {
          '@type': 'Offer',
          name: '7-Seater / Large Full Interior Shampoo & Detailing',
          description: '7-Seater SUVs, minivans & large trucks. All 3 rows shampooing, heavy salt removal & steam sanitization.',
          price: '150.00',
          priceCurrency: 'CAD',
        },
        {
          '@type': 'Offer',
          name: 'Pickup Truck Detailing',
          description: 'Standard pickup trucks & work trucks. Cab seat shampooing, floor mat extraction, door panels & salt removal.',
          price: '125.00',
          priceCurrency: 'CAD',
        },
        {
          '@type': 'Offer',
          name: 'Day Cab Commercial Truck Detailing',
          description: 'Semi-trucks & commercial day cabs. Seat shampooing, floor & pedal deep clean, dashboard & steam sanitization.',
          price: '140.00',
          priceCurrency: 'CAD',
        },
        {
          '@type': 'Offer',
          name: 'Sleeper Bed Semi-Truck Detailing',
          description: 'Sleeper cab semi-trucks & long-haul rigs. Cab & sleeper berth shampooing, mattress deep clean & steam sanitization.',
          price: '250.00',
          priceCurrency: 'CAD',
        },
      ],
    },
    sameAs: [
      'https://www.facebook.com/people/A-shine-Automobile-Detailing/61580395624520/',
      'https://www.instagram.com/ashineautomobiledetailing/',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.a-shineautomobiledetailing.ca/#website',
    name: 'A-Shine Auto Mobile Detailing',
    alternateName: 'A-Shine Auto',
    url: 'https://www.a-shineautomobiledetailing.ca',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does mobile car detailing work? Do you come to my location?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! A-Shine Auto is 100% mobile. We bring our commercial-grade steam cleaning equipment, hot water extractors, and premium detailing supplies directly to your driveway, workplace, or condo parking in Kitchener, Waterloo, Cambridge, and Guelph. Studio drop-off is also available at 54 Woodbine Avenue, Kitchener.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to supply water or an electrical power outlet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We typically require access to a standard electrical outlet and an exterior water spigot at your location. If you reside in an apartment or condominium with limited access, please let us know when booking so we can accommodate your setup or arrange studio drop-off.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a full interior detailing appointment take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A standard small car or sedan takes approximately 2 to 2.5 hours. 5-seater and 7-seater SUVs take 2.5 to 3.5 hours. Commercial day cabs and sleeper rigs take 3 to 5 hours depending on interior condition and soil level.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you completely remove winter salt stains and stubborn spills?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Winter road salt extraction is one of our top specialties in Ontario. We utilize high-temperature thermal steam and heavy-duty extraction to dissolve and lift embedded rock salt and stains from carpets and floor mats without harming fabric fibers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you remove pet hair from seats and carpets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We offer a dedicated 99% Pet Hair Extraction service (+ $20 flat rate add-on). We use specialized mechanical and rubber extraction tools to lift woven pet hairs from car seats, carpets, and trunk lining.',
        },
      },
      {
        '@type': 'Question',
        name: 'What areas do you service in Ontario?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We primarily serve Kitchener, Waterloo, Cambridge, and Guelph, as well as surrounding communities including Baden, Elmira, Conestogo, Woolwich, and Breslau.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are your prices for mobile interior detailing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We maintain clear, flat-rate pricing with no hidden fees: Small Car ($100), 5-Seater SUV ($125), 7-Seater/Large SUV ($150), Pickup Truck ($125), Commercial Day Cab ($140), and Sleeper Bed Semi-Truck ($250). Pet Hair Extraction is +$20.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I book an appointment or get a free quote?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can instantly request a free quote via the online form on our website, call or text us directly at (519) 729-5856, or message us on WhatsApp for rapid scheduling.',
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.a-shineautomobiledetailing.ca',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://www.a-shineautomobiledetailing.ca/#services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Pricing',
        item: 'https://www.a-shineautomobiledetailing.ca/#pricing',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'FAQ',
        item: 'https://www.a-shineautomobiledetailing.ca/#faq',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: 'https://www.a-shineautomobiledetailing.ca/#contact',
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
        {children}
        <GoogleAnalytics gaId="G-2S5G4J3R2W" />
      </body>
    </html>
  );
}
