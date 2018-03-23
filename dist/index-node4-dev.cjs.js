'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Logger = _interopDefault(require('nightingale-logger'));
var t = _interopDefault(require('flow-runtime'));

var logger = new Logger('graceful-kill');

var index = (function (process) {
  var SIGTERMTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;

  var _SIGTERMTimeoutType = t.number();

  t.param('SIGTERMTimeout', _SIGTERMTimeoutType).assert(SIGTERMTimeout);
  return new Promise(function (resolve) {
    if (process.exitCode !== null || process.signalCode !== null) {
      logger.warn('process already exited', { pid: process.pid });
      return resolve();
    }
    var killTimeout = setTimeout(function () {
      if (process.exitCode !== null || process.signalCode !== null) {
        logger.warn('kill timeout: process already exited', { pid: process.pid });
        return resolve();
      }

      logger.warn('kill timeout: sending SIGKILL...', { pid: process.pid });
      process.kill('SIGKILL');
    }, SIGTERMTimeout);

    process.removeAllListeners();
    process.once('exit', function (code, signal) {
      logger.info('stopped', { pid: process.pid, code, signal });
      if (killTimeout) clearTimeout(killTimeout);
      resolve();
    });
    process.kill();
  });
});

module.exports = index;
//# sourceMappingURL=index-node4-dev.cjs.js.map
