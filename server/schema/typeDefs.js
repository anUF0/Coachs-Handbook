const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    teams: [Team]
  }

  type Team {
    _id: ID
    teamName: String
    players: [Player]
    teamValue: Int
  }

  type Player {
    _id: ID
    position: String
    MA: Int!
    ST: Int!
    AG: Int!
    PA: Int!
    AV: Int!
    skillsAndTraits: [String]
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
    teams: [Team]
    team(_id: ID!): Team
    players: [Player]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTeam(teamName:String!): Team
    removeTeam(teamId: ID!): Team
    addPlayer(teamId: ID!, position: String!, MA: Int!, ST: Int!, AG: Int!, PA: Int!, AV: Int!, skillsAndTraits: [String], cost: Int!): Player
    removePlayer(teamId: ID!, playerId: ID!): Player
  }
 `;

module.exports = typeDefs;
