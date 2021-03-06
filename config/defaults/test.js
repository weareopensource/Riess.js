const _ = require('lodash');
const defaultConfig = require('./development');

module.exports = _.merge(defaultConfig, {
  app: {
    title: 'WeAreOpenSource Node - Test Environment',
  },
  api: {
    host: 'localhost',
    port: 3001,
  },
  port: 3001,
  db: {
    uri: 'mongodb://localhost/WaosNodeTest',
    debug: false,
  },
  livereload: false,
});
