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
        instance_id
        basic_information {
          id
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

export const ADD_TO_COLLECTION = gql`
  mutation addToCollection(
    $username: String!
    $token: String!
    $tokenSecret: String!
    $release: String!
    $folder: String
  ) {
    addToCollection(
      username: $username
      token: $token
      tokenSecret: $tokenSecret
      release: $release
      folder: $folder
    ) {
      instance_id
      resource_url
    }
  }
`;

export const REMOVE_FROM_COLLECTION = gql`
  mutation removeFromCollection(
    $username: String!
    $token: String!
    $tokenSecret: String!
    $release: String!
    $folder: String!
    $instance: String!
  ) {
    removeFromCollection(
      username: $username
      token: $token
      tokenSecret: $tokenSecret
      release: $release
      folder: $folder
      instance: $instance
    ) {
      success
      message
    }
  }
`;
