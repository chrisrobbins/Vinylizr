module.exports = {
  Query: {
    collection: async (
      _,
      { username, token, tokenSecret, page, folder },
      { dataSources }
    ) => {
      try {
        const response = await dataSources.collectionAPI.getCollectionSections(
          token,
          tokenSecret,
          username,
          folder,
          page
        );
        return response;
      } catch (error) {
        return error;
      }
    },
    wantlist: async (
      _,
      { username, token, tokenSecret, page, folder },
      { dataSources }
    ) => {
      try {
        const response = await dataSources.wantlistAPI.getWantlistSections(
          token,
          tokenSecret,
          username,
          folder,
          page
        );
        return response || [];
      } catch (error) {
        return error;
      }
    },
    discogsSearch: async (
      _,
      { q, page, per_page, format, token, tokenSecret },
      { dataSources }
    ) => {
      try {
        const response = await dataSources.discogsSearchAPI.databaseSearch(
          token,
          tokenSecret,
          query,
          format,
          page,
          per_page
        );
        return response;
      } catch (err) {
        return error;
      }
    },
  },
  Mutation: {
    addToCollection: async (
      _,
      { username, token, tokenSecret, release, folder },
      { dataSources }
    ) => {
      try {
        const response = await dataSources.collectionAPI.addReleaseToCollection(
          token,
          tokenSecret,
          username,
          release,
          folder
        );
        return response;
      } catch (error) {
        return error;
      }
    },
    removeFromCollection: async (
      _,
      { username, token, tokenSecret, release, folder, instance },
      { dataSources }
    ) => {
      try {
        const response = await dataSources.collectionAPI.removeReleaseFromCollection(
          username,
          token,
          tokenSecret,
          release,
          folder,
          instance
        );
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};
