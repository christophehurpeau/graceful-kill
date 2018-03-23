import Logger from 'nightingale-logger';
import t from 'flow-runtime';

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

export default index;
//# sourceMappingURL=index-node8-dev.es.js.map
