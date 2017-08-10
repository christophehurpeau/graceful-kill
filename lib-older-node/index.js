'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nightingaleLogger = require('nightingale-logger');

var _nightingaleLogger2 = _interopRequireDefault(_nightingaleLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = new _nightingaleLogger2.default('graceful-kill');

exports.default = function (process) {
  var SIGTERMTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;
  return new Promise(function (resolve) {
    var killTimeout = setTimeout(function () {
      logger.warn('timeout: sending SIGKILL...');
      process.kill('SIGKILL');
    }, SIGTERMTimeout);

    process.removeAllListeners();
    process.once('exit', function (code, signal) {
      logger.info('stopped', { code, signal });
      if (killTimeout) clearTimeout(killTimeout);
      resolve();
    });
    process.kill();
  });
};
//# sourceMappingURL=index.js.map