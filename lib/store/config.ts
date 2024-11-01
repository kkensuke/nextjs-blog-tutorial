export const STORE_CONFIG = {
  products: {
    basic: {
      id: 'basic',
      name: 'Basic',
      price: 0,
      period: 'month',
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
      price: 5,
      period: 'month',
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
      price: 10,
      period: 'month',
      features: [
        'All Pro features',
        'Feature 8',
        'Feature 9',
        'Priority Support'
      ],
      isPopular: false
    }
  },
  tax: {
    rate: 0.1, // 10% tax rate
    label: 'Tax'
  },
  currency: {
    code: 'USD',
    symbol: '$'
  }
};