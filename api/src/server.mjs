import { ApolloServer } from 'apollo-server';
import typeDefs from './schema.mjs';
import resolvers from './resolvers.mjs';
import { mockSubscriptions } from './mocks/mockData.mjs';

const db = [...mockSubscriptions];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return { db }; // models and db will be passed here
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
