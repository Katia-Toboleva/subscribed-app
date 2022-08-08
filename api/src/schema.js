import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar NonNegativeInt
  scalar Timestamp
  scalar PhoneNumber
  scalar Currency

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
    startDate: Timestamp!
    frequency: FrequencyType!
    amount: NonNegativeInt!
    currency: Currency
    url: String!
    notification: NotificationType!
    totalPaid: NonNegativeInt!
  }

  type User {
    id: ID!
    username: String!
    name: String
    surname: String!
    title: TitleType
    email: String!
    phoneNumber: PhoneNumber
    profileImage: String
    subscriptions: [Subscription]!
  }

  type Query {
    getSubscriptions: [Subscription]!
  }
`;

export default typeDefs;
