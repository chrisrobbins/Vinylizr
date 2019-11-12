const CollectionAPI = require('./collection');
const WantlistAPI = require('./wantlist');
const DiscogsSearchAPI = require('./search');

const DiscogsAPI = {
  collectionAPI: new CollectionAPI(),
  wantlistAPI: new WantlistAPI(),
  discogsSearchAPI: new DiscogsSearchAPI(),
};

module.exports = DiscogsAPI;
