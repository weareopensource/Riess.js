/**
 * Module dependencies
 */
const passport = require('passport');
const path = require('path');

const policy = require(path.resolve('./lib/middlewares/policy'));
const historys = require('../controllers/historys.controller');

/**
 * Routes
 */
module.exports = (app) => {
  // stats
  app.route('/api/historys/stats').all(policy.isAllowed)
    .get(historys.stats);

  // list & post
  app.route('/api/historys').all(passport.authenticate('jwt'), policy.isAllowed)
    .get(historys.list); // list

  // classic crud
  app.route('/api/historys/:historyId').all(passport.authenticate('jwt'), policy.isAllowed) // policy.isOwner available
    .get(historys.get); // get

  // Finish by binding the historys middleware
  app.param('historyId', historys.historyByID);
};