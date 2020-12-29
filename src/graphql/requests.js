import {gql} from '@apollo/client';

export const GET_USER_BY_ID = gql`
  {
    users {
      id
      url
    }
  }
`;
