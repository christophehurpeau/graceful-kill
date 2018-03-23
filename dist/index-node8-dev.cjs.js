'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Logger = _interopDefault(require('nightingale-logger'));
var t = _interopDefault(require('flow-runtime'));

const logger = new Logger('graceful-kill');

var index = ((process, SIGTERMTimeout = 4000) => {
  let _SIGTERMTimeoutType = t.number();

  t.param('SIGTERMTimeout', _SIGTERMTimeoutType).assert(SIGTERMTimeout);
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
});

module.exports = index;
//# sourceMappingURL=index-node8-dev.cjs.js.map
