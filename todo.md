// **===============Schema=============**

type User {
    __typename: "user",
    id: string!,
    username: string!,
    name: string,
    surname: string!,
    middleName: string,
    title: TitleType,
    email: string!,
    phoneNumber: number,
    profileImage: string,
    subscriptions: Subscription[]!,
}

type Subscription {
    __typename: "subscription",
    id: id!,
    logo: string,
    subscriptionName: string!,
    subscriptionType: SubscriptionType!,
    startDate: Date!,
    endDate: Date,
    frequency: FrequencyType!,
    amount: float!,
    url: string!,
    notification: NotificationType!,
    totalPaid: float!,
}

enum TitleType {
    mr,
    ms,
    miss,
    mrs,
}

enum SubscriptionType {
    trial,
    recurring,
}

enum FrequencyType {
    monthly,
    weekly,
    yearly,
}

enum NotificationType {
    email,
    popup,
    none,
}

enum FilterType {
    all,
    active,
    trial,
    old,
}

// **==========Queries=============**

userQuery(id: id!) => User
getSubscription(id: id!) => Subscription
getSubscriptionMany(input: SubscriptionInput) => Subscription[]

input SubscriptionInput {
    id: id!,
    filterType: FilterType,
}

// **===============Mutations=============**

addSubscription(input: AddSubscriptionInput) => Subscription
editSubscription(input: EditSubscriptionInput) => Subscription
deleteSubscription(input: DeleteSubscriptionInput) => Subscription

input AddSubscriptionInput {
    logo: string,
    subscriptionName: string!,
    subscriptionType: SubscriptionType!,
    startDate: Date!,
    endDate: Date,
    frequency: FrequencyType!,
    amount: float!,
    url: string!,
    notification: NotificationType!,
}

input EditSubscriptionInput {
    id: id!
    logo: string,
    subscriptionName: string!,
    subscriptionType: SubscriptionType!,
    startDate: Date!,
    endDate: Date,
    frequency: FrequencyType!,
    amount: float!,
    url: string!,
    notification: NotificationType!,
}

input DeleteSubscriptionInput {
    id: id!,
}

