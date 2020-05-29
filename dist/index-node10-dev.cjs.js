'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const Logger = _interopDefault(require('nightingale-logger'));

const logger = new Logger('graceful-kill');
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
//# sourceMappingURL=index-node10-dev.cjs.js.map
