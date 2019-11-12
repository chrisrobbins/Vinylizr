const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    collection(
      username: String!
      tokenSecret: String!
      token: String!
      page: String
      folder: String
    ): [CollectionSections]!
    wantlist(
      username: String!
      tokenSecret: String!
      token: String!
      page: String
      folder: String
    ): [CollectionSections]!
    discogsSearch(
      token: String!
      tokenSecret: String!
      query: String!
      page: String
      per_page: String
    ): [SearchResponse]!
  }
  type Mutation {
    addToCollection(
      username: String!
      tokenSecret: String!
      token: String!
      folder: String
      release: String!
    ): CollectionResponse!
    removeFromCollection(
      username: String!
      token: String!
      tokenSecret: String!
      release: String!
      folder: String!
      instance: String!
    ): RemoveReleaseResponse!
  }
  type CollectionResponse {
    success: Boolean
    message: String
    instance_id: String
    resource_url: String
  }
  type RemoveReleaseResponse {
    success: Boolean
    message: String
  }
  type Release {
    pagination: Pagination
    id: ID!
    instance_id: ID!
    folder_id: ID!
    rating: Int
    basic_information: BasicInfo
    notes: [Note]
  }
  type Label {
    resource_url: String
    entity_type: String
    catno: Int
    id: ID!
    name: String
  }
  type Artist {
    id: ID!
    name: String
    join: String
    resource_url: String
    anv: String
    tracks: String
    role: String
  }
  type BasicInfo {
    id: ID!
    title: String
    year: Int
    resource_url: String
    thumb: String
    cover_image: String
    formats: [Float]
    labels: [Label]
    artists: [Artist]
  }
  type Note {
    field_id: ID!
    value: String
  }
  type CollectionSections {
    title: String
    data: [Release]!
    sectionId: String
  }
  type Pagination {
    per_page: Int
    pages: Int
    page: Int
    items: Int
    urls: [PaginatePrevNextUrls]
  }
  type PaginatePrevNextUrls {
    next: String
    last: String
  }
  type SearchResponse {
    pagination: Pagination
    results: [SearchResults]!
  }
  type Community {
    want: Int
    have: Int
  }
  type SearchResults {
    thumb: String
    title: String
    country: String
    format: [String]
    uri: String
    community: Community
    label: [String]
    catno: String
    year: String
    genre: [String]
    resource_url: String
    type: String
    id: ID
  }
`;

module.exports = typeDefs;
