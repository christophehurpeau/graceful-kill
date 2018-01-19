'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nightingaleLogger = require('nightingale-logger');

var _nightingaleLogger2 = _interopRequireDefault(_nightingaleLogger);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _nightingaleLogger2.default('graceful-kill');

exports.default = function index(process, SIGTERMTimeout = 4000) {
  let _SIGTERMTimeoutType = _flowRuntime2.default.number();

  _flowRuntime2.default.param('SIGTERMTimeout', _SIGTERMTimeoutType).assert(SIGTERMTimeout);

  return new Promise(resolve => {
    if (process.exitCode !== null || process.signalCode !== null) {
      logger.warn('process already exited', { pid: process.pid });
      return resolve();
    }
    const killTimeout = setTimeout(() => {
      if (process.exitCode !== null || process.signalCode !== null) {
        logger.warn('kill timeout: process already exited', { pid: process.pid });
        return resolve();
      }

      logger.warn('kill timeout: sending SIGKILL...', { pid: process.pid });
      process.kill('SIGKILL');
    }, SIGTERMTimeout);

    process.removeAllListeners();
    process.once('exit', (code, signal) => {
      logger.info('stopped', { pid: process.pid, code, signal });
      if (killTimeout) clearTimeout(killTimeout);
      resolve();
    });
    process.kill();
  });
};
//# sourceMappingURL=index.js.map