const express = require('express');
var bodyParser = require('body-parser');
const Discogs = require('disconnect').Client;
const isEmpty = require('lodash');
const port = 3000;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/authorize', function(req, res) {
  const oAuth = new Discogs().oauth();
  oAuth.getRequestToken(
    process.env.CONSUMER_KEY,
    process.env.CONSUMER_SECRET,
    'https://auth.expo.io/@chrisrobbins/Vinylizr',
    function(err, requestData) {
      res.send(requestData);
    }
  );
});

app.post('/callback', function(req, res) {
  const { oauth_verifier } = req.query;
  const oAuth = new Discogs(req.body).oauth();
  oAuth.getAccessToken(oauth_verifier, function(err, accessData) {
    if (err) return res.send(err);
    res.send(accessData);
  });
});

app.post('/identity', function(req, res) {
  const accessData = {
    level: 2,
    method: 'oauth',
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    token: req.body.token,
    tokenSecret: req.body.tokenSecret,
  };
  var dis = new Discogs(accessData);
  dis.getIdentity(function(err, data) {
    res.send(data);
  });
});

app.post('/collection', function(req, res) {
  const { user, folder, page } = req.query;
  const { token, tokenSecret } = req.body;
  const accessData = {
    level: 2,
    method: 'oauth',
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    token,
    tokenSecret,
  };
  var dis = new Discogs(accessData).user().collection();
  dis.getReleases(user, folder, { page: page, per_page: 75 }, function(
    err,
    data
  ) {
    var vinylData = data.releases.reduce((arrangedData, data) => {
      // c[0] should be the first letter of an entry
      var record = data.basic_information.artists[0].name[0].toLocaleUpperCase();

      // either push to an existing dict entry or create one
      if (arrangedData[record]) arrangedData[record].push(data);
      else arrangedData[record] = [data];
      return arrangedData;
    }, {});

    var collectionSections = Object.entries(vinylData).map(vinyl => {
      return {
        title: vinyl[0],
        data: vinyl[1],
        sectionId: Math.random()
          .toString(36)
          .slice(2),
      };
    });
    res.send(collectionSections);
  });
});

app.post('/database/search', function(req, res) {
  const { q, page, per_page } = req.query;
  const { token, tokenSecret } = req.body;
  const searchQuery = {
    q,
    page,
    per_page,
  };

  const accessData = {
    level: 1,
    method: 'oauth',
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    token,
    tokenSecret,
  };

  var dis = new Discogs(accessData).database();
  dis.search(searchQuery, function(err, data) {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

app.post('/collection/save', function(req, res) {
  const { user, folder, release } = req.query;
  const { token, tokenSecret } = req.body;

  const accessData = {
    level: 2,
    method: 'oauth',
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    token,
    tokenSecret,
  };

  var dis = new Discogs(accessData).user().collection();
  dis.addRelease(user, folder, release, function(err, data) {
    console.log('record added success', data);
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
