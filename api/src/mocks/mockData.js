export const mockSubscriptions = [
  {
    id: 435435345435,
    logo: 'mylogo',
    name: 'Amazon Video',
    type: 'recurring',
    startDate: 1631224298,
    endDate: '',
    frequency: 'weekly',
    amount: 1099,
    currency: 'GBP',
    url: 'www.am-video.com',
    notification: 'email',
    totalPaid: 5433,
  },
  {
    id: 435435345436,
    logo: 'mylogo',
    name: 'My Video',
    type: 'recurring',
    startDate: 1596923498,
    endDate: 1631224298,
    frequency: 'weekly',
    amount: 3099,
    currency: 'GBP',
    url: 'www.am-video.com',
    notification: 'email',
    totalPaid: 5433,
  },
  {
    id: 435435345437,
    logo: 'mylogo',
    name: 'On Delivery',
    type: 'recurring',
    startDate: 1633819898,
    endDate: '',
    frequency: 'monthly',
    amount: 601,
    currency: 'GBP',
    url: 'www.am-video.com',
    notification: 'email',
    totalPaid: 5433,
  },
  {
    id: 435435345438,
    logo: 'mylogo',
    name: 'A Video',
    type: 'trial',
    startDate: 1636501898,
    endDate: '',
    frequency: 'weekly',
    amount: 1279,
    currency: 'GBP',
    url: 'www.am-video.com',
    notification: 'email',
    totalPaid: 5433,
  },
  {
    id: 435435345439,
    logo: 'somelogo',
    name: 'Netflix',
    type: 'recurring',
    startDate: 1639093898,
    endDate: '',
    frequency: 'weekly',
    amount: 1499,
    currency: 'GBP',
    url: 'www.netflix.com',
    notification: 'email',
    totalPaid: 74.33,
  }];

export const mockUsers = [
  {
    id: 123,
    username: 'john-smith',
    name: 'John',
    surname: 'Smith',
    title: 'Mr',
    email: 'john-smith@mail.com',
    phoneNumber: 44567899033,
    subscriptions: mockSubscriptions,
  },
];
