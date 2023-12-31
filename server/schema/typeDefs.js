const typeDefs = `
  type User {
    _id: ID
    username: String!
    teamName: String!
    email: String!
    password: String!
    players: [Player]
  }

  type Player {
    _id: ID
    coachName: String!
    position: String!
    MA: Int!
    ST: Int!
    AG: Int!
    PA: Int!
    AV: Int!
    skillsAndTraits: String
    cost: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    me: User
    players: [Player]
  }

  type Mutation {
    addUser(username: String!, teamName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPlayer(position: String!, MA: Int!, ST: Int!, AG: Int!, PA: Int!, AV: Int!, skillsAndTraits: String): Player
    removePlayer(playerId: ID!): Player
  }
 `;

module.exports = typeDefs;
