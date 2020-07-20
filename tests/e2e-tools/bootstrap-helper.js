const app = require('../../app');

module.exports = (() => {
  const helper = {};

  helper.getInstance = function getInstance() {
    return app;
  };
  return helper;
})();