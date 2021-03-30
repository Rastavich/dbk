export const GET_USER_BY_ID = `
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
      digital_asset {
        websites {
          url
          serviceStatus
          domain_name_server {
            username
            password
          }
        }
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

export const CREATE_ASSET = `
  
`;
