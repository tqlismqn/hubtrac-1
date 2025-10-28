// HUBTRAC Tire Product Data
// Source: https://www.hubtractyre.com

export interface TireSpecification {
  size: string;
  rimSize?: string;
  plyRating?: string | number;
  loadIndex?: string;
  maxLoadSingle?: string;
  maxLoadDual?: string;
  maxPressure?: string;
  overallDiameter?: string;
  sectionWidth?: string;
  treadDepth?: string;
}

export interface TireModel {
  id: string;
  name: string;
  category: 'HIGHWAY' | 'REGIONAL' | 'URBAN' | 'COACH' | 'MIXED';
  productLine: 'HUBTRAC 2.0' | 'CLASSIC';
  description: string;
  features: string[];
  benefits: string[];
  specifications: TireSpecification[];
  imageUrl?: string;
  technologies?: {
    name: string;
    description: string;
  }[];
}

export const tireCategories = [
  { id: 'highway', label: 'Highway', description: 'Long-distance highway transport' },
  { id: 'regional', label: 'Regional', description: 'Regional and mixed-duty applications' },
  { id: 'urban', label: 'Urban', description: 'City and urban delivery' },
  { id: 'coach', label: 'Coach', description: 'Passenger coach and bus' },
] as const;

export const tireModels: TireModel[] = [
  {
    id: 'regional-s11',
    name: 'REGIONAL S11',
    category: 'REGIONAL',
    productLine: 'CLASSIC',
    description: 'A regional truck tire designed for medium-to-heavy-duty applications, optimized for fuel economy and long tire life.',
    features: [
      'Reduces weight for increased payload compared to duals',
      'Construction optimized for fuel economy',
      'Special tread design focused on fuel efficiency',
      'Designed for long tire life',
    ],
    benefits: [
      'Increased payload capacity',
      'Lower fuel consumption',
      'Extended service life',
      'Reduced operating costs',
    ],
    specifications: [
      {
        size: '295/60R22.5',
        loadIndex: '150L',
        maxLoadSingle: '3,350 kg',
        maxPressure: '850 kPa',
        treadDepth: '12.5 mm',
        overallDiameter: '926 mm',
      },
      {
        size: '295/80R22.5',
        loadIndex: '152L',
        maxLoadSingle: '3,550 kg',
        maxPressure: '900 kPa',
        treadDepth: '14.5 mm',
        overallDiameter: '1,044 mm',
      },
      {
        size: '315/60R22.5',
        loadIndex: '154L',
        maxLoadSingle: '3,750 kg',
        maxPressure: '900 kPa',
        treadDepth: '14.5 mm',
        overallDiameter: '946 mm',
      },
      {
        size: '315/70R22.5',
        loadIndex: '156L',
        maxLoadSingle: '4,000 kg',
        maxPressure: '900 kPa',
        treadDepth: '15.5 mm',
        overallDiameter: '1,006 mm',
      },
      {
        size: '315/80R22.5',
        loadIndex: '158L',
        maxLoadSingle: '4,500 kg',
        maxPressure: '900 kPa',
        treadDepth: '16.5 mm',
        overallDiameter: '1,066 mm',
      },
      {
        size: '385/55R22.5',
        loadIndex: '160K',
        maxLoadSingle: '4,500 kg',
        maxPressure: '900 kPa',
        treadDepth: '14.5 mm',
        overallDiameter: '1,006 mm',
      },
      {
        size: '385/65R22.5',
        loadIndex: '160K',
        maxLoadSingle: '5,000 kg',
        maxPressure: '900 kPa',
        treadDepth: '16.5 mm',
        overallDiameter: '1,076 mm',
      },
    ],
    imageUrl: '/images/tires/regional-s11.jpg',
  },
  {
    id: 'coach-g21',
    name: 'COACH G21',
    category: 'COACH',
    productLine: 'HUBTRAC 2.0',
    description: 'Premium coach tire designed for long-haul passenger transport with advanced technologies for extended service life and optimal performance.',
    features: [
      'SOCT Technology for optimized tire wear',
      'Enlarged land-to-sea ratio for better wear performance',
      '3D Interlocking Technology to control tread block movement',
      'Variable blade depth for consistent grip',
    ],
    benefits: [
      'Excellent mileage and handling performance',
      'Long service life',
      'Reduced abnormal block wear',
      'Consistent grip throughout tire lifespan',
    ],
    specifications: [
      {
        size: '295/80R22.5',
        rimSize: '9.00',
        plyRating: '18',
        loadIndex: '154/149M',
        maxLoadSingle: '3,750 kg at 850 kPa',
        maxLoadDual: '3,250 kg at 850 kPa',
        overallDiameter: '1,044 mm',
        sectionWidth: '298 mm',
        treadDepth: '14.5 mm',
      },
    ],
    technologies: [
      {
        name: 'SOCT Technology',
        description: 'Innovative design that optimizes tire wear for excellent mileage and handling performance',
      },
      {
        name: 'Land-to-Sea Ratio',
        description: 'Enlarged proportion delivering better wear performance and long service life',
      },
      {
        name: '3D Interlocking Technology',
        description: 'Controls tread block movement to avoid abnormal block wear',
      },
      {
        name: 'Variable Blade Depth',
        description: 'Maintains consistent grip throughout the tire\'s lifespan, extending service longevity',
      },
    ],
    imageUrl: '/images/tires/coach-g21.jpg',
  },
  {
    id: 'highway-t21',
    name: 'HIGHWAY T21',
    category: 'HIGHWAY',
    productLine: 'HUBTRAC 2.0',
    description: 'Premium highway tire engineered for long-distance transport with focus on fuel efficiency and durability.',
    features: [
      'Optimized for highway applications',
      'Advanced compound for reduced rolling resistance',
      'Reinforced construction for high-speed stability',
      'Enhanced tread pattern for even wear',
    ],
    benefits: [
      'Maximum fuel efficiency',
      'Extended tire life',
      'Superior high-speed performance',
      'Reduced operating costs',
    ],
    specifications: [],
    imageUrl: '/images/tires/highway-t21.jpg',
  },
  {
    id: 'highway-s21',
    name: 'HIGHWAY S21',
    category: 'HIGHWAY',
    productLine: 'CLASSIC',
    description: 'Reliable highway tire for commercial transport with proven performance and cost-effectiveness.',
    features: [
      'Proven tread design',
      'Balanced performance characteristics',
      'Suitable for mixed highway conditions',
      'Cost-effective solution',
    ],
    benefits: [
      'Reliable performance',
      'Good value for money',
      'Versatile application',
      'Consistent quality',
    ],
    specifications: [],
    imageUrl: '/images/tires/highway-s21.jpg',
  },
  {
    id: 'regional-t15',
    name: 'REGIONAL T15',
    category: 'REGIONAL',
    productLine: 'HUBTRAC 2.0',
    description: 'Advanced regional tire designed for mixed highway and urban applications with excellent traction and durability.',
    features: [
      'Versatile tread pattern',
      'Enhanced traction on various road surfaces',
      'Optimized for regional routes',
      'Durable construction',
    ],
    benefits: [
      'Multi-surface performance',
      'Long service life',
      'Reliable in diverse conditions',
      'Reduced maintenance costs',
    ],
    specifications: [],
    imageUrl: '/images/tires/regional-t15.jpg',
  },
  {
    id: 'regional-t22',
    name: 'REGIONAL T22',
    category: 'REGIONAL',
    productLine: 'HUBTRAC 2.0',
    description: 'High-performance regional tire for demanding applications with focus on mileage and fuel economy.',
    features: [
      'Advanced tread compound',
      'Optimized block design',
      'Enhanced sidewall protection',
      'Fuel-efficient construction',
    ],
    benefits: [
      'Extended mileage',
      'Lower fuel consumption',
      'Increased durability',
      'Better retreadability',
    ],
    specifications: [],
    imageUrl: '/images/tires/regional-t22.jpg',
  },
];

// Helper functions
export function getTiresByCategory(category: TireModel['category']): TireModel[] {
  return tireModels.filter(tire => tire.category === category);
}

export function getTiresByProductLine(productLine: TireModel['productLine']): TireModel[] {
  return tireModels.filter(tire => tire.productLine === productLine);
}

export function getTireById(id: string): TireModel | undefined {
  return tireModels.find(tire => tire.id === id);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(tireModels.map(tire => tire.category)));
}
