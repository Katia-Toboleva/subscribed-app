import { ApolloServer } from 'apollo-server';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context() {
  //   return db; // models and db will be passed here
  // },
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
