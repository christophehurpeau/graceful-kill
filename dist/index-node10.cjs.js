'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const Logger = require('nightingale-logger');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const Logger__default = /*#__PURE__*/_interopDefaultLegacy(Logger);

const logger = new Logger__default['default']('graceful-kill');
function gracefulKill(process, SIGTERMTimeout = 4000) {
  return new Promise(resolve => {
    if (process.exitCode !== null || process.signalCode !== null) {
      logger.warn('process already exited', {
        pid: process.pid
      });
      return resolve();
    }

    const killTimeout = setTimeout(() => {
      if (process.exitCode !== null || process.signalCode !== null) {
        logger.warn('kill timeout: process already exited', {
          pid: process.pid
        });
        return resolve();
      }

      logger.warn('kill timeout: sending SIGKILL...', {
        pid: process.pid
      });
      process.kill('SIGKILL');
    }, SIGTERMTimeout);
    process.removeAllListeners();
    process.once('exit', (code, signal) => {
      logger.info('stopped', {
        pid: process.pid,
        code,
        signal
      });
      if (killTimeout) clearTimeout(killTimeout);
      resolve();
    });
    process.kill();
  });
}

exports.default = gracefulKill;
//# sourceMappingURL=index-node10.cjs.js.map
