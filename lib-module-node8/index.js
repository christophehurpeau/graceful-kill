import Logger from 'nightingale-logger';

const logger = new Logger('graceful-kill');

export default ((process, SIGTERMTimeout = 4000) => new Promise(resolve => {
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
}));
//# sourceMappingURL=index.js.map