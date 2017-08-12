import Logger from 'nightingale-logger/src';

const logger = new Logger('graceful-kill');

export default (process, SIGTERMTimeout: number = 4000) =>
  new Promise(resolve => {
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
