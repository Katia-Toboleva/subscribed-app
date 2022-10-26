import { nanoid } from 'nanoid';
import { AuthenticationError } from 'apollo-server';
import { mockSubscriptions, mockUsers } from './mocks/mockData.js';
import { TimestampResolver, PhoneNumberResolver, CurrencyResolver, NonNegativeIntResolver } from 'graphql-scalars';
import { authenticated, authorized } from './auth.js';

const subscriptions = [...mockSubscriptions];
const users = [...mockUsers];

const now = Math.floor(Date.now() / 1000);

const resolvers = {
  NonNegativeInt: NonNegativeIntResolver,
  Timestamp: TimestampResolver,
  PhoneNumber: PhoneNumberResolver,
  Currency: CurrencyResolver,
  Query: {
    getSubscriptions: authenticated(async (_, { input }, { prisma }) => {
      if (input.filterType === 'ACTIVE') {
        return subscriptions.filter((item) => item.type !== 'trial' && (!item?.endDate || item?.endDate > now));
      }

      if (input.filterType === 'TRIAL') {
        return subscriptions.filter((item) => item.type === 'trial' && (!item?.endDate || item?.endDate > now));
      }

      if (input.filterType === 'OLD') {
        return subscriptions.filter((item) => !!item?.endDate && item?.endDate < now);
      }

      return prisma.subscription.findMany();
    }),
    getSubscriptionById: authenticated((_, { id }) => {
      return subscriptions.find((item) => item.id === +id);
    }),
    getUsers: authenticated(authorized('ADMIN', (_, { input }, { prisma }) => {
      return prisma.user.findMany();
    })), // only available for ADMIN
    getUserById: authenticated((_, { id }) => {
      return users.find((user) => user.id === +id);
    }),
  },
  Mutation: {
    addSubscription: authenticated((_, { input }, { prisma }) => {
      return prisma.subscription.create({
        data: {
          ...input.subscription,
          id: nanoid(),
          createdAt: now,
        }
      });
    }),
    editSubscription: authenticated((_, { input }) => {
      const subscription = subscriptions.find((item) => item.id === +input.id);
      return {
        ...subscription,
        ...input.subscription,
      };
    }),
    deleteSubscription: authenticated((_, { input }) => {
      return subscriptions.filter((item) => item.id !== +input.id);
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
      return subscriptions.filter((item) => item.user === +user.id);
    },
  },
  Subscription: {
    user(subscription) {
      return users.find((item) => item.id === +subscription.user);
    },
  },
};

export default resolvers;
