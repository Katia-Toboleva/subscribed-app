import { ApolloServer } from 'apollo-server';
import typeDefs from './schema.mjs';
import resolvers from './resolvers.mjs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context() {
  //   return { models, db }  // models and db will be passed here
  // }
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});