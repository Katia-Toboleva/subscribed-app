import { nanoid } from 'nanoid';
import { AuthenticationError } from 'apollo-server';
import { mockSubscriptions, mockUsers } from './mocks/mockData.js';
import { TimestampResolver, PhoneNumberResolver, CurrencyResolver, NonNegativeIntResolver } from 'graphql-scalars';
import { authenticated, authorized } from './auth.js';

const data = [...mockSubscriptions];
const users = [...mockUsers];

const now = Math.floor(Date.now() / 1000);

const resolvers = {
  NonNegativeInt: NonNegativeIntResolver,
  Timestamp: TimestampResolver,
  PhoneNumber: PhoneNumberResolver,
  Currency: CurrencyResolver,
  Query: {
    getSubscriptions: authenticated((_, { input }) => {
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
    }),
    getSubscriptionById: authenticated((_, { id }) => {
      return data.find((item) => item.id === +id);
    }),
    getUsers: authenticated(authorized('ADMIN', (_, { input }) => {
      return users;
    })), // only available for ADMIN
    getUserById: authenticated((_, { id }) => {
      return users.find((user) => user.id === +id);
    }),
  },
  Mutation: {
    addSubscription: authenticated((_, { input }) => {
      return {
        ...input.subscription,
        id: nanoid(),
        createdAt: now,
      };
    }),
    editSubscription: authenticated((_, { input }) => {
      const subscription = data.find((item) => item.id === +input.id);
      return {
        ...subscription,
        ...input.subscription,
      };
    }),
    deleteSubscription: authenticated((_, { input }) => {
      return data.filter((item) => item.id !== +input.id);
    }),
    signup(_, { input: { email, password, role = 'MEMBER' } }, { createToken }) {
      const isExistingUser = users.find(mockUser => mockUser.email === email);

      if (isExistingUser) {
        throw new Error('User already exists');
      }

      const username = email.substring(0, email.indexOf('@'));

      const user = ({ email, password, id: nanoid(), username, role });
      const token = createToken(user);

      return { token, user };
    },
    login(_, { input }, { createToken }) {
      const user = users.find(mockUser => mockUser.email === input.email && mockUser.password === input.password);

      if (!user) {
        throw new AuthenticationError('Incorrect login details');
      }

      const token = createToken(user);
      
      return { token, user };
    }
  },
  User: {
    subscriptions(user) {
      return data.filter((item) => item.user === +user.id);
    },
  },
  Subscription: {
    user(subscription) {
      return users.find((item) => item.id === +subscription.user);
    },
  },
};

export default resolvers;
