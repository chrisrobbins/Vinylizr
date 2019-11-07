const { RESTDataSource } = require('apollo-datasource-rest');

class WantlistAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8081/';

    // this.baseURL = 'http://vinylizr.us-east-2.elasticbeanstalk.com/';
  }

  // get all releases in a Wantlist

  async getWantlistSections(token, tokenSecret, username, folder, page) {
    const accessData = { token, tokenSecret };
    const response = await this.post(
      `wantlist?folder=${folder}&user=${username}&page=${page}`,
      accessData
    );

    return response || [];
  }
}

module.exports = WantlistAPI;
