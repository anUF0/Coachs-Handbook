const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    team: [Team]
  }

  type Team {
    _id: ID
    teamName: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
