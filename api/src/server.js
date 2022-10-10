import { ApolloServer } from 'apollo-server';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import { createToken, getUserFromToken } from './auth.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    // return db; // models and db will be passed here
    const token = req.headers.authorization;
    const user = getUserFromToken(token);
    return { user, createToken };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
