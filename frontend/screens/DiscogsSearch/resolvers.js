import gql from 'graphql-tag';

export const SEARCH_DISCOGS_DATABASE = gql`
  query discogsSearch(
    $token: String!
    $tokenSecret: String!
    $query: String!
    $page: String
    $per_page: String
  ) {
    discogsSearch(
      token: $token
      tokenSecret: $tokenSecret
      query: $query
      page: $page
      per_page: $per_page
    ) {
      thumb
      title
      country
      format
      uri
      community {
        want
        have
      }
      label
      catno
      year
      genre
      resource_url
      type
      id
    }
  }
`;
