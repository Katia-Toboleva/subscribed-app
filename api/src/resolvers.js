import { nanoid } from 'nanoid';
import { mockSubscriptions, mockUsers } from './mocks/mockData.js';
import { TimestampResolver, PhoneNumberResolver, CurrencyResolver, NonNegativeIntResolver } from 'graphql-scalars';

const data = [...mockSubscriptions];
const users = [...mockUsers];

const now = Math.floor(Date.now() / 1000);

const resolvers = {
  NonNegativeInt: NonNegativeIntResolver,
  Timestamp: TimestampResolver,
  PhoneNumber: PhoneNumberResolver,
  Currency: CurrencyResolver,
  Query: {
    getSubscriptions(_, { input }) {
      if (input.filterType === 'ACTIVE') {
        return data.filter((item) => item.type !== 'trial' && (!item?.endDate || item?.endDate > now));
      }

      if (input.filterType === 'TRIAL') {
        return data.filter((item) => item.type === 'trial' && (!item?.endDate || item?.endDate > now));
      }

      if (input.filterType === 'OLD') {
        return data.filter((item) => !!item?.endDate && item?.endDate < now);
      }

      return data;
    },
    getSubscriptionById(_, { id }) {
      return data.find((item) => item.id === +id);
    },
    getUserById(_, { id }) {
      return users.find((user) => user.id === +id);
    },
  },
  Mutation: {
    addSubscription(_, { input }) {
      return {
        ...input.subscription,
        id: nanoid(),
        createdAt: now,
      };
    },
  },
};

export default resolvers;
