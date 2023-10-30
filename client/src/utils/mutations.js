import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser(
    $username: String!
    $teamName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      teamName: $teamName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PLAYER = gql`
  mutation AddPlayer(
    $position: String!
    $MA: Int!
    $ST: Int!
    $AG: Int!
    $PA: Int!
    $AV: Int!
  ) {
    addPlayer(
      position: $position
      MA: $MA
      ST: $ST
      AG: $AG
      PA: $PA
      AV: $AV
    ) {
      _id
      coachName
      position
      MA
      ST
      AG
      PA
      AV
      skillsAndTraits
    }
  }
`;

export const DELETE_PLAYER = gql`
  mutation RemovePlayer($playerId: ID!) {
    removePlayer(playerId: $playerId) {
      _id
      position
    }
  }
`;
