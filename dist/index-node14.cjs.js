'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingaleLogger = require('nightingale-logger');

const logger = new nightingaleLogger.Logger('graceful-kill');
function gracefulKill(process, SIGTERMTimeout = 4000) {
  return new Promise(resolve => {
    if (process.exitCode !== null || process.signalCode !== null) {
      logger.warn('process already exited', {
        pid: process.pid
      });
      resolve();
      return;
    }

    const killTimeout = setTimeout(() => {
      if (process.exitCode !== null || process.signalCode !== null) {
        logger.warn('kill timeout: process already exited', {
          pid: process.pid
        });
        resolve();
        return;
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

exports["default"] = gracefulKill;
exports.gracefulKill = gracefulKill;
//# sourceMappingURL=index-node14.cjs.js.map
