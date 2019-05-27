import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';

import fetch from 'node-fetch';

import { BASE_URL } from './constants';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'A star wars Character',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: "A character's  name",
      resolve: person => person.name,
    },
    gender: {
      type: GraphQLString,
      description: 'A star wars gender',
      resolve: person => person.gender,
    },
    vehicles: {
      type: new GraphQLList(GraphQLString),
      description: 'A list<Array> of vehicles owned by a character',
      resolve: person => person.vehicles,
    },
    films: {
      type: GraphQLList(GraphQLString),
      description: 'A list<Array> of films that a character has featured in',
      resolve: person => person.films,
    },
    species: {
      type: GraphQLList(GraphQLString),
      description: 'The species of a character',
      resolve: person => person.species,
    },
    starships: {
      type: GraphQLList(GraphQLString),
      description: 'A list<Array> of starchips owned by a character',
      resolve: person => person.starships,
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query of all',
  fields: () => ({
    People: {
      type: new GraphQLList(PersonType),
      description: 'All Star Wars Characters',
      resolve: (root, args) =>
        fetch(`${BASE_URL}/people`)
          .then(response => response.json())
          .then(data => data.results),
    },
    Person: {
      type: PersonType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: (root, args) =>
        fetch(`${BASE_URL}/people/${args.id}`)
          .then(response => response.json())
          .then(data => data),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
