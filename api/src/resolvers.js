import { mockSubscriptions } from './mocks/mockData.js';
import { TimestampResolver, PhoneNumberResolver, CurrencyResolver, NonNegativeIntResolver } from 'graphql-scalars';

const data = [...mockSubscriptions];

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
  },
};

export default resolvers;
