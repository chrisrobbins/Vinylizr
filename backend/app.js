const express = require('express');
var bodyParser = require('body-parser');
const Discogs = require('disconnect').Client;
const port = 8081;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.get('/authorize', function(req, res) {
  const oAuth = new Discogs().oauth();
  oAuth.getRequestToken(
    process.env.CONSUMERKEY,
    process.env.CONSUMERSECRET,
    'https://auth.expo.io/@chrisrobbins/Vinylizr',
    function(err, requestData) {
      if (err) res.send(err);
      res.send(requestData);
    }
  );
});

app.post('/callback', function(req, res) {
  const { oauth_verifier } = req.query;
  const oAuth = new Discogs(req.body).oauth();
  oAuth.getAccessToken(oauth_verifier, function(err, accessData) {
    if (err) res.send(err);
    res.send(accessData);
  });
});

app.post('/identity', function(req, res) {
  const { token, tokenSecret } = req.body;
  const accessData = {
    level: 2,
    method: 'oauth',
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    token,
    tokenSecret,
  };
  var dis = new Discogs(accessData);
  dis.getIdentity(function(err, data) {
    if (err) res.send('Identity missing', err);
    res.send(data);
  });
});

app.post('/collection', function(req, res) {
  console.log({ req });
  const { user, folder, page } = req.query;
  const { token, tokenSecret } = req.body;
  console.log({ user, token, tokenSecret, folder, page });
  const accessData = {
    level: 2,
    method: 'oauth',
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    token,
    tokenSecret,
  };
  const dis = user && new Discogs(accessData).user().collection();
  user &&
    dis.getReleases(user, folder, { page: page, per_page: 75 }, function(
      err,
      data
    ) {
      let vinylData =
        data &&
        data.releases &&
        data.releases.reduce((arrangedData, data) => {
          // c[0] should be the first letter of an entry
          var record = data.basic_information.artists[0].name[0].toLocaleUpperCase();

          console.log({ vinylData });

          if (!vinylData) return;

          // either push to an existing dict entry or create one
          if (arrangedData[record]) arrangedData[record].push(data);
          else arrangedData[record] = [data];
          return arrangedData;
        }, {});

      let collectionSections =
        vinylData &&
        Object.entries(vinylData).map(vinyl => {
          return {
            title: vinyl[0],
            data: vinyl[1],
            sectionId: Math.random()
              .toString(36)
              .slice(2),
          };
        });
      let orderedSections =
        collectionSections &&
        collectionSections.sort(function(a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
      res.send(orderedSections);
    });
});

app.get('/database/release', function(req, res) {
  const { release } = req.query;

  let dis = new Discogs().database();
  dis.getRelease(release, function(err, data) {
    if (err) throw console.error();
    res.send(data);
  });
});

app.post('/wantlist', function(req, res) {
  const { user, page } = req.query;
  const { token, tokenSecret } = req.body;
  const accessData = {
    level: 2,
    method: 'oauth',
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    token,
    tokenSecret,
  };
  var dis = new Discogs(accessData).user().wantlist();
  dis.getReleases(user, { page: page, per_page: 75 }, function(err, data) {
    var vinylData = data.wants.reduce((arrangedData, data) => {
      // c[0] should be the first letter of an entry
      var record = data.basic_information.artists[0].name[0].toLocaleUpperCase();

      // either push to an existing dict entry or create one
      if (arrangedData[record]) arrangedData[record].push(data);
      else arrangedData[record] = [data];
      return arrangedData;
    }, {});

    var wantlistSections = Object.entries(vinylData).map(vinyl => {
      return {
        title: vinyl[0],
        data: vinyl[1],
        sectionId: Math.random()
          .toString(36)
          .slice(2),
      };
    });
    let orderedSections = wantlistSections.sort(function(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

    res.send(orderedSections);
  });
});

app.post('/database/master-releases', function(req, res) {
  const { master, page } = req.query;
  const { token, tokenSecret } = req.body;
  const accessData = {
    level: 2,
    method: 'oauth',
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    token,
    tokenSecret,
  };
  var dis = new Discogs(accessData).database();
  dis.getMasterVersions(master, { page: page, per_page: 75 }, function(
    err,
    data
  ) {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

app.post('/database/search', function(req, res) {
  const { q, page, per_page, format } = req.query;
  const { token, tokenSecret } = req.body;
  const searchQuery = {
    q,
    page,
    per_page,
    format,
  };

  const accessData = {
    level: 1,
    method: 'oauth',
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
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
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    token,
    tokenSecret,
  };
  var dis = new Discogs(accessData).user().collection();
  dis.addRelease(user, folder, release, function(err, data) {
    if (err) {
      console.log('ERROR', err);
      throw err;
    }
    res.send(data);
  });
});

app.post('/collection/remove', function(req, res) {
  const { user, folder, release, instance } = req.query;
  const { token, tokenSecret } = req.body;

  const accessData = {
    level: 2,
    method: 'oauth',
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    token,
    tokenSecret,
  };
  var dis = new Discogs(accessData).user().collection();
  dis.removeRelease(user, folder, release, instance, function(err, data) {
    if (err) {
      console.log('ERROR', err);
      throw err;
    }
    res.send(data);
  });
});

app.post('/wantlist/save', function(req, res) {
  const { user, release } = req.query;
  const { token, tokenSecret } = req.body;

  const accessData = {
    level: 2,
    method: 'oauth',
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    token,
    tokenSecret,
  };
  var dis = new Discogs(accessData).user().wantlist();
  dis.addRelease(user, release, function(err, data) {
    if (err) {
      console.log('ERROR', err);
      throw err;
    }
    res.send(data);
  });
});

app.post('/wantlist/remove', function(req, res) {
  const { user, release } = req.query;
  const { token, tokenSecret } = req.body;

  const accessData = {
    level: 2,
    method: 'oauth',
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    token,
    tokenSecret,
  };
  var dis = new Discogs(accessData).user().wantlist();
  dis.removeRelease(user, release, function(err, data) {
    if (err) {
      console.log('ERROR', err);
      throw err;
    }
    res.send(data);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
