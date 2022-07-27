import { mockSubscriptions } from './mocks/mockData.mjs';

const data = [...mockSubscriptions];

const resolvers = {
  Query: {
    getSubscriptions() {
      return data;
    },
  },
};

export default resolvers;
