import { ApolloServer } from 'apollo-server';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import { createToken, getUserFromToken } from './auth.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req, res }) {
    const token = req.headers.authorization;
    const user = await getUserFromToken(token, prisma);
    return { prisma, user, createToken };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
