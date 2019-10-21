module.exports = {
  Query: {
    collection: async (
      _,
      { username, token, tokenSecret, page, folder },
      { dataSources }
    ) => {
      const response = await dataSources.collectionAPI.getCollectionSections(
        token,
        tokenSecret,
        username,
        folder,
        page
      );
      return response || [];
    },
    wantlist: async (
      _,
      { username, token, tokenSecret, page, folder },
      { dataSources }
    ) => {
      const response = await dataSources.wantlistAPI.getWantlistSections(
        token,
        tokenSecret,
        username,
        folder,
        page
      );
      return response || [];
    },
  },
};
