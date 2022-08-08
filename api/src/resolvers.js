import { mockSubscriptions } from './mocks/mockData.js';

const data = [...mockSubscriptions];

const resolvers = {
  Query: {
    getSubscriptions() {
      return data;
    },
  },
};

export default resolvers;
