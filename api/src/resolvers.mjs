import { mockSubscriptions } from './mocks/mockData.mjs';

const data = [...mockSubscriptions];

const resolvers = {
  Query: {
    getSubscriptions() {
      console.log(data, 'data');
      return data;
    },
  },
};

export default resolvers;
