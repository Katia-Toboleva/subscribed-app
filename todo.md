// **===============Schema=============**

type User {
    __typename: "user",
    id: Id!,
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
    id: Id!,
    logo: string,
    name: string!,
    type: SubscriptionType!,
    startDate: Date!,
    endDate: Date,
    frequency: FrequencyType!,
    amount: float!,
    url: string!,
    notification: NotificationType!,
    totalPaid: float!, <!-- computed value, calc by resolver --!>
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
    all = 'all',
    active = 'active',
    trial = 'trial',
    old,
}

// **==========Queries=============**

getUserById(id: Id!) => User
getSubscriptionById(id: Id!) => Subscription
getSubscriptions(input: GetSubscriptionsInput) => Subscription[]

input GetSubscriptionsInput {
    id: Id!,
    filterType: FilterType,
}

// **===============Mutations=============**
login(input: LoginInput) => User

addSubscription(input: AddSubscriptionInput) => Subscription

editSubscription(input: EditSubscriptionInput) => Subscription

deleteSubscription(input: DeleteSubscriptionInput) => Subscription

input AddSubscriptionInput {
    subscription: AddSubscriptionInput,
}

type SubscriptionInput {
    logo: string,
    name: string!,
    type: SubscriptionType!,
    startDate: Date!,
    endDate: Date,
    frequency: FrequencyType!,
    amount: float!,
    url: string!,
    notification: NotificationType!,
}

<!-- input AddSubscriptionInput {
    logo: string,
    name: string!,
    type: SubscriptionType!,
    startDate: Date!,
    endDate: Date,
    frequency: FrequencyType!,
    amount: float!,
    url: string!,
    notification: NotificationType!,
} -->

input EditSubscriptionInput {
    id: id!
    subscription: SubscriptionInput,
    <!-- logo: string,
    name: string!,
    type: SubscriptionType!,
    startDate: Date!,
    endDate: Date,
    frequency: FrequencyType!,
    amount: float!,
    url: string!,
    notification: NotificationType!, -->
}

input DeleteSubscriptionInput {
    id: id!,
}

union LoginInput = LoginWithEmailInput | LoginWithUsernameInput

input LoginWithEmailInput {
    email: string!,
    password: string!,
}

input LoginWithUsernameInput {
    username: string!,
    password: string!,
}


1) Subscription.totalPaid
computed value in the resolver
no need to store in DB
resolver calc the value

2) check enums for GraphQL, is this okay?
enum - give explicit values
use Objects

3) queries conventions: query -> get, single -> byId, multiple -> pluralise, input type-> name of query or mutaion appended by Input(name of variable)

4) login endpoint
that lets me find a user in DB by username

5) package to auto-generate schema, you write a resolver and it creates schema automatically - check packages for that
ORM approach to GraphQL server
Prisma

schema-first approach vs code-first approach - 