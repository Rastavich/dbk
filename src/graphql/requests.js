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

export const GET_ASSET_BY_USER = gql`
  query GetAsset($id: ID!) {
    user(id: $id) {
      digital_assets {
        url
      }
    }
  }
`;
