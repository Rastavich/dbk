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

export const GET_ASSET_BY_USER = `
  query GetAsset($id: ID!) {
    user(id: $id) {
      digital_assets {
        url
      }
    }
  }
`;

export const REGISTER_USER = `
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(input: {username: $username, email: $email, password: $password}) {
      jwt
      user {
        username
        email
      }
    }
  }
`;
