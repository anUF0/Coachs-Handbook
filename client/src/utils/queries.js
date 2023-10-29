import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
      password
      teams {
        _id
        teamName
        teamValue
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query getUser($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      teams {
        _id
        teamName
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    s
    me {
      _id
      username
      email
      teams {
        _id
        teamName
      }
    }
  }
`;

export const QUERY_TEAMS = gql`
  query getTeams {
    teams {
      _id
      teamName
    }
  }
`;

export const QUERY_PLAYERS = gql`
  query getPlayers {
    players {
      _id
      position
      MA
      ST
      AG
      AV
      PA
      skillsAndTraits
      cost
    }
  }
`;

export const QUERY_SINGLE_TEAM = gql`
  query getTeam($id: ID!) {
    team(_id: $id) {
      teamName
      players {
        _id
        position
      }
    }
  }
`;
