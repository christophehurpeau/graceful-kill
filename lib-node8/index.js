'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nightingaleLogger = require('nightingale-logger');

var _nightingaleLogger2 = _interopRequireDefault(_nightingaleLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _nightingaleLogger2.default('graceful-kill');

exports.default = (process, SIGTERMTimeout = 4000) => new Promise(resolve => {
  if (process.exitCode !== null || process.signalCode !== null) {
    logger.warn('process already exited');
    return resolve();
  }
  const killTimeout = setTimeout(() => {
    logger.warn('timeout: sending SIGKILL...');
    process.kill('SIGKILL');
  }, SIGTERMTimeout);

  process.removeAllListeners();
  process.once('exit', (code, signal) => {
    logger.info('stopped', { code, signal });
    if (killTimeout) clearTimeout(killTimeout);
    resolve();
  });
  process.kill();
});
//# sourceMappingURL=index.js.map