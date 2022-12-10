import { AuthenticationError } from 'apollo-server';
import { mockSubscriptions, mockUsers } from './mocks/mockData';
import { TimestampResolver, PhoneNumberResolver, CurrencyResolver, NonNegativeIntResolver } from 'graphql-scalars';
import { authenticated, authorized } from './auth';

const subscriptions = [...mockSubscriptions];
const users = [...mockUsers];

const now = Date.now();

const resolvers = {
  NonNegativeInt: NonNegativeIntResolver,
  Timestamp: TimestampResolver,
  PhoneNumber: PhoneNumberResolver,
  Currency: CurrencyResolver,
  Query: {
    getSubscriptions: authenticated(async (_, { input: { filterType, id } }, { prisma }) => {
      if (filterType === 'ACTIVE') {
        return subscriptions.filter((item) => item.type !== 'trial' && (!item?.endDate || item?.endDate > now));
      }

      if (filterType === 'TRIAL') {
        return subscriptions.filter((item) => item.type === 'trial' && (!item?.endDate || item?.endDate > now));
      }

      if (filterType === 'OLD') {
        return subscriptions.filter((item) => !!item?.endDate && item?.endDate < now);
      }

      return prisma.subscription.findMany({
        where: {
          userId: id,
        },
      });
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
          startDate: new Date(input.subscription.startDate).toISOString(),
          createdAt: new Date().toISOString(),
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
    async signup(_, { input: { email, password, role } }, { createToken, prisma }) {
      const isExistingUser = await prisma.user.findUnique({
        where: {
          email,
        }
      });

      if (isExistingUser) {
        throw new Error('User already exists');
      }

      const username = email.substring(0, email.indexOf('@'));

      const user = prisma.user.create({
        data: {
          email,
          username,
          role: role || 'GUEST',
          password,
        },
      });
      const token = createToken(user);

      return { token, user };
    },
    async login(_, { input: { email, password }}, { createToken, prisma }) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        }
      })

      if (!user || user.password && user.password !== password) {
        throw new AuthenticationError('Incorrect login details');
      }

      const token = createToken(user);
      
      return { token, user };
    },
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
