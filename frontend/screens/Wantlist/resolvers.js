import gql from 'graphql-tag';

export const GET_WANTLIST = gql`
  query wantlist(
    $username: String!
    $token: String!
    $tokenSecret: String!
    $page: String
    $folder: String
  ) {
    wantlist(
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
