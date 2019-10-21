const CollectionAPI = require('./collection');
const WantlistAPI = require('./wantlist');

const DiscogsAPI = {
  collectionAPI: new CollectionAPI(),
  wantlistAPI: new WantlistAPI(),
};

module.exports = DiscogsAPI;
