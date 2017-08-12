import Logger from 'nightingale-logger';

import t from 'flow-runtime';
const logger = new Logger('graceful-kill');

export default (function index(process, SIGTERMTimeout = 4000) {
  let _SIGTERMTimeoutType = t.number();

  t.param('SIGTERMTimeout', _SIGTERMTimeoutType).assert(SIGTERMTimeout);
  return new Promise(resolve => {
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
});
//# sourceMappingURL=index.js.map