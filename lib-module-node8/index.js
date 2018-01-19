import Logger from 'nightingale-logger';

const logger = new Logger('graceful-kill');

export default ((process, SIGTERMTimeout = 4000) => new Promise(resolve => {
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
}));
//# sourceMappingURL=index.js.map