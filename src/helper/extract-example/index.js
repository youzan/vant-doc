const nodeWatch = require('node-watch');
const extracter = require('./extracter');

module.exports = function(config = {}) {
  if (config.watch) {
    extracter(config);
    nodeWatch(config.src, { recursive: true }, () => extracter(config));
  } else {
    extracter(config);
  }
};
