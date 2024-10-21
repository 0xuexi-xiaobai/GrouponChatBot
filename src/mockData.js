export const products = [
  {
    id: 1,
    title: 'Dinner for Two',
    description: 'Includes two main courses, two sides, and two drinks',
    originalPrice: 288,
    discountPrice: 188,
    image: '/images/meal-for-two.jpg',
    category: 'Dining',
  },
  {
    id: 2,
    title: 'Full Body Massage',
    description: '90-minute professional massage to relieve stress',
    originalPrice: 399,
    discountPrice: 299,
    image: '/images/massage.jpg',
    category: 'Beauty & Health',
  },
  {
    id: 3,
    title: 'Theme Park Tickets',
    description: 'One-day pass, includes all attractions',
    originalPrice: 280,
    discountPrice: 180,
    image: '/images/theme-park.jpg',
    category: 'Entertainment',
  },
  {
    id: 4,
    title: 'Yoga Class Package',
    description: '10 yoga classes, suitable for beginners',
    originalPrice: 800,
    discountPrice: 588,
    image: '/images/yoga.jpg',
    category: 'Fitness',
  },
  {
    id: 5,
    title: 'Movie Night for Two',
    description: 'Two movie tickets + popcorn and drinks',
    originalPrice: 120,
    discountPrice: 88,
    image: '/images/movie.jpg',
    category: 'Entertainment',
  },
];

export const userInteractions = [
  {
    userId: 1,
    productId: 1,
    action: 'view',
    timestamp: new Date('2023-05-01T10:30:00'),
  },
  {
    userId: 1,
    productId: 2,
    action: 'like',
    timestamp: new Date('2023-05-01T11:15:00'),
  },
  {
    userId: 2,
    productId: 3,
    action: 'purchase',
    timestamp: new Date('2023-05-02T14:20:00'),
  },
  {
    userId: 3,
    productId: 4,
    action: 'view',
    timestamp: new Date('2023-05-03T09:45:00'),
  },
  {
    userId: 3,
    productId: 5,
    action: 'like',
    timestamp: new Date('2023-05-03T10:00:00'),
  },
];

export const mockOrders = [
  {
    id: '1001',
    date: '2023-05-15',
    status: 'Delivered',
    total: 89.99,
    items: [
      { name: 'Restaurant Voucher', price: 49.99 },
      { name: 'Movie Tickets', price: 40.0 },
    ],
  },
  {
    id: '1002',
    date: '2023-05-20',
    status: 'In Transit',
    total: 129.99,
    items: [{ name: 'Spa Package', price: 129.99 }],
  },
  {
    id: '1003',
    date: '2023-05-25',
    status: 'Processing',
    total: 59.99,
    items: [{ name: 'Fitness Class Package', price: 59.99 }],
  },
];

export const bestDeals = [
  {
    id: 1,
    title: '50% Off Luxury Spa Day',
    description: 'Full day spa treatment including massage and facial',
    price: 99.99,
    savings: '100.01',
  },
  {
    id: 2,
    title: '3-Course Dinner for Two',
    description: 'Romantic dinner at a top-rated restaurant',
    price: 79.99,
    savings: '70.01',
  },
  {
    id: 3,
    title: 'Adventure Park All-Access Pass',
    description: 'Full day access to all rides and attractions',
    price: 49.99,
    savings: '50.01',
  },
  {
    id: 4,
    title: '2-Night Beach Resort Getaway',
    description: 'Luxurious beachfront accommodation for two',
    price: 299.99,
    savings: '200.01',
  },
  {
    id: 5,
    title: 'Annual Gym Membership',
    description: 'Access to all gym facilities and classes for one year',
    price: 399.99,
    savings: '300.01',
  },
];
