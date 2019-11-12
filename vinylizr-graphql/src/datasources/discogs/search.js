const { RESTDataSource } = require('apollo-datasource-rest');

class DiscogsSearchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8081/';
    // this.baseURL = 'http://vinylizr.us-east-2.elasticbeanstalk.com/';
  }

  async databaseSearch(token, tokenSecret, query, page, per_page) {
    const accessData = { token, tokenSecret };
    try {
      const response = await this.post(
        `database/search?q=${query}&artist=${query}&page=${page}&per_page=${per_page}`,
        accessData
      );

      return response;
    } catch (err) {
      console.error('Something went wrong with search', err);
    }
  }
}

module.exports = DiscogsSearchAPI;
