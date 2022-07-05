const resolvers = {
  Query: {
    getSubscriptions(_, __, ___) {
      return [{
        id: 435435345435,
        logo: 'String',
        name: 'Am',
        type: 'recurrring',
        startDate: 2312312312,
        endDate: 2321321312,
        frequency: 'weekly',
        amount: 10.99,
        url: 'www.ddd.ss',
        notification: 'email',
        totalPaid: 4.33,
      }];
    }
  },
};

export default resolvers;