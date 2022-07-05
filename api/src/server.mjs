import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return {} // models and db will be passed here
  }
})

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
})