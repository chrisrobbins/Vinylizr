import gql from 'graphql-tag';

export const GET_COLLECTION = gql`
  query collection(
    $username: String!
    $token: String!
    $tokenSecret: String!
    $page: String
    $folder: String
  ) {
    collection(
      username: $username
      token: $token
      tokenSecret: $tokenSecret
      page: $page
      folder: $folder
    ) {
      title
      data {
        basic_information {
          title
          year
          cover_image
          labels {
            name
          }
          artists {
            name
          }
        }
      }
    }
  }
`;
