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
`;

module.exports = typeDefs;
