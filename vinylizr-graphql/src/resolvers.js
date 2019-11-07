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
        if (!response) console.log('GRAPH QL ERROR C');
        return response || [];
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
        console.log({ response });
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
      console.log('DELETE INSTNANCE', username, instance, release);
      try {
        const response = await dataSources.collectionAPI.removeReleaseFromCollection(
          username,
          token,
          tokenSecret,
          release,
          folder,
          instance
        );
        console.log({ response });
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};
