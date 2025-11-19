import { ApolloServer } from 'apollo-server';
import { ApolloError } from 'apollo-server-errors';
import typeDefs from './schema';
import resolvers from './resolvers';
import { createToken, getUserFromToken } from './auth';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req, res }) {
    const token = req.headers.authorization;
    const user = await getUserFromToken(token, prisma);
    return { prisma, user, createToken };
  },
  formatError: (e) => {
    // Don't give the specific errors to the client.
    if (e.originalError instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e);
      return new Error('Database error');
    }

    if (e.originalError instanceof ApolloError) {
      return e.originalError;
    }

    if (e.originalError instanceof Error) {
      console.log(e);
      return new Error('Internal server error');
    }

    // Otherwise return the original error. The error can also
    // be manipulated in other ways, as long as it's returned.
    return e;
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
