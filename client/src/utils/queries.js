import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
      teamName
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query getUser($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      teamName
      players {
        _id
        position
        MA
        ST
        AG
        PA
        AV
        skillsAndTraits
        cost
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      teamName
      players {
        _id
        position
        MA
        ST
        AG
        PA
        AV
        skillsAndTraits
        cost
      }
    }
  }
`;

export const QUERY_PLAYERS = gql`
  query getPlayers {
    players {
      _id
      coachName
      position
      MA
      ST
      AG
      PA
      AV
      skillsAndTraits
      cost
    }
  }
`;
