import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar NonNegativeInt
  scalar Timestamp
  scalar PhoneNumber
  scalar Currency

  enum TitleType {
    MR
    MS
    MISS
    MRS
  }

  enum SubscriptionType {
    TRIAL
    RECURRING
  }

  enum FrequencyType {
    MONTHLY
    WEEKLY
    YEARLY
  }

  enum NotificationType {
    EMAIL
    POPUP
    NONE
  }

  enum FilterType {
    ALL
    ACTIVE
    TRIAL
    OLD
  }

  type Subscription {
    id: ID!
    logo: String
    name: String!
    type: SubscriptionType!
    startDate: Timestamp!
    endDate: Timestamp!
    createdAt: Timestamp!
    frequency: FrequencyType!
    amount: NonNegativeInt!
    currency: Currency
    url: String!
    notification: NotificationType
    totalPaid: NonNegativeInt!
    subscriptionUser: User!
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

  input GetSubscriptionsInput {
    filterType: FilterType,
  }

  input SubscriptionInput {
    logo: String,
    name: String,
    type: SubscriptionType,
    startDate: Timestamp,
    endDate: Timestamp,
    frequency: FrequencyType,
    amount: NonNegativeInt,
    url: String,
    notification: NotificationType,
  }

  input AddSubscriptionInput {
    subscription: SubscriptionInput,
  }

  input EditSubscriptionInput {
    id: ID!
    subscription: SubscriptionInput,
  }

  input DeleteSubscriptionInput {
    id: ID!
  }

  type Query {
    getSubscriptions(input: GetSubscriptionsInput): [Subscription]!
    getSubscriptionById(id: ID!): Subscription
    getUserById(id: ID!): User
  }

  type Mutation {
    addSubscription(input: AddSubscriptionInput!): Subscription!
    editSubscription(input: EditSubscriptionInput!): Subscription!
    deleteSubscription(input: DeleteSubscriptionInput!): [Subscription]!
  }
`;

export default typeDefs;
