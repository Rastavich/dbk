import {gql} from '@apollo/client';

export const GET_USER_BY_ID = gql`
  {
    digitalAssets {
      id
      email
      url
    }
  }
`;
