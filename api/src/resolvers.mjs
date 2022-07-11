const resolvers = {
  Query: {
    getSubscriptions(_, db) {
      return db;
    },
  },
};

export default resolvers;
