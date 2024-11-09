export const STORE_CONFIG = {
  products: {
    basic: {
      id: 'basic',
      name: 'Basic',
      description: 'Try it out',
      price: 1,
      period: 'month',
      stripePriceId: 'price_1QIjRXCKj7dQMglZAFKW9g2u',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4'
      ],
      isPopular: false
    },
    pro: {
      id: 'pro',
      name: 'Pro',
      description: 'Perfect for getting started',
      price: 5,
      period: 'month',
      stripePriceId: 'price_1QIjPcCKj7dQMglZCrVsWGBr',
      features: [
        'All Basic features',
        'Feature 5',
        'Feature 6',
        'Feature 7'
      ],
      isPopular: true
    },
    enterprise: {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Best for professionals',
      price: 10,
      period: 'month',
      stripePriceId: 'price_1QIjR9CKj7dQMglZWgLsb2w4',
      features: [
        'All Pro features',
        'Feature 8',
        'Feature 9',
        'Priority Support'
      ],
      isPopular: false
    }
  },
  currency: {
    symbol: '$'
  }
};
