const { RESTDataSource } = require('apollo-datasource-rest');

class CollectionAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8081/';
    // this.baseURL = 'http://vinylizr.us-east-2.elasticbeanstalk.com/';
  }

  // get all releases in a collection

  async getCollectionSections(token, tokenSecret, username, folder, page) {
    const accessData = { token, tokenSecret };
    try {
      const response = await this.post(
        `collection?folder=${folder}&user=${username}&page=${page}`,
        accessData
      );
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async addReleaseToCollection(token, tokenSecret, username, release, folder) {
    console.log({ token, tokenSecret, username, release, folder });
    const accessData = { token, tokenSecret };
    try {
      const response = await this.post(
        `collection/save?user=${username}&release=${release}&folder=${folder}`,
        accessData
      );

      return {
        instance_id: response.instance_id,
        resource_url: response.resource_url,
      };
    } catch (err) {
      console.error('ADD COLLEXTIN NO GO BRO', err);
    }
  }

  async removeReleaseFromCollection(
    username,
    token,
    tokenSecret,
    release,
    folder,
    instance
  ) {
    if (!username || !token) return;
    const accessData = { token, tokenSecret };
    try {
      const response = await this.post(
        `collection/remove?${folder}&user=${username}&release=${release}&folder=${folder}&instance=${instance}`,
        accessData
      );
      return {
        success: true,
        message: 'Successfully deleted instance from collection',
      };
    } catch (err) {
      console.error('super error from adding release', err);
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }
}

module.exports = CollectionAPI;
