import { gql } from 'apollo-server';

const typeDefs = gql`
  enum TitleType {
    mr
    ms
    miss
    mrs
  }

  enum SubscriptionType {
    trial
    recurring
  }

  enum FrequencyType {
    monthly
    weekly
    yearly
  }

  enum NotificationType {
    email
    popup
    none
  }

  enum FilterType {
    all
    active
    trial
    old
  }

  type Subscription {
    id: ID!
    logo: String
    name: String!
    type: SubscriptionType!
    startDate: String!
    endDate: String
    frequency: FrequencyType!
    amount: Float!
    url: String!
    notification: NotificationType!
    totalPaid: Float!
  }

  type User {
    id: ID!
    username: String!
    name: String
    surname: String!
    middleName: String
    title: TitleType
    email: String!
    phoneNumber: Float
    profileImage: String
    subscriptions: [Subscription]!
  }

  type Query {
    getSubscriptions: [Subscription]!
  }
`;

export default typeDefs;
