import Script from 'next/script';

export default function StructuredData() {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TruckHub Mobile Tire Service',
    description: 'Professional mobile tire service for commercial trucks in Europe',
    url: 'https://hubtrac-mobile-service.vercel.app', // Update with actual domain
    logo: 'https://hubtrac-mobile-service.vercel.app/logo.png', // TO ADD: Add logo image
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+421-XXX-XXX-XXX', // TO ADD: Add actual phone number
      contactType: 'Customer Service',
      areaServed: ['SK', 'DE', 'AT'],
      availableLanguage: ['Slovak', 'German', 'English'],
    },
    sameAs: [
      // TO ADD: Add social media profiles if they exist
      // 'https://www.facebook.com/hubtrac',
      // 'https://www.linkedin.com/company/hubtrac',
    ],
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    name: 'TruckHub Mobile Tire Service',
    image: 'https://hubtrac-mobile-service.vercel.app/hero-image.jpg', // TO ADD: Add hero image
    '@id': 'https://hubtrac-mobile-service.vercel.app',
    url: 'https://hubtrac-mobile-service.vercel.app',
    telephone: '+421-XXX-XXX-XXX', // TO ADD: Add actual phone number
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Street Address', // TO ADD: Add actual address
      addressLocality: 'City',
      postalCode: 'ZIP',
      addressCountry: 'SK', // Update based on primary location
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.1486, // TO ADD: Add actual coordinates
      longitude: 17.1077,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Slovakia',
      },
      {
        '@type': 'Country',
        name: 'Germany',
      },
      {
        '@type': 'Country',
        name: 'Austria',
      },
    ],
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Mobile Tire Replacement Service',
    provider: {
      '@type': 'Organization',
      name: 'TruckHub Mobile Tire Service',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Slovakia',
      },
      {
        '@type': 'Country',
        name: 'Germany',
      },
      {
        '@type': 'Country',
        name: 'Austria',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tire Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Emergency Mobile Tire Replacement',
            description: '24/7 emergency tire replacement service for commercial trucks',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Commercial Truck Tire Installation',
            description: 'Professional tire installation for commercial vehicles',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fleet Tire Maintenance',
            description: 'Scheduled tire maintenance for commercial fleets',
          },
        },
      ],
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EUR',
      },
    },
  };

  // Product Schema (TruckHub Tires)
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'TruckHub Commercial Truck Tires',
    description: 'Premium commercial truck tires with 6-year warranty. Available in HIGHWAY, MIXED, URBAN, and COACH categories.',
    brand: {
      '@type': 'Brand',
      name: 'TruckHub',
    },
    offers: {
      '@type': 'AggregateOffer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8', // TO UPDATE: Add actual ratings if available
      reviewCount: '800', // Based on 800+ partners
    },
    warranty: {
      '@type': 'WarrantyPromise',
      durationOfWarranty: {
        '@type': 'QuantitativeValue',
        value: '6',
        unitCode: 'ANN',
      },
    },
  };

  // BreadcrumbList Schema (to be customized per page)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hubtrac-mobile-service.vercel.app',
      },
    ],
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
