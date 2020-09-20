import type { ChildProcess } from 'child_process';
import Logger from 'nightingale-logger';

const logger = new Logger('graceful-kill');

export default function gracefulKill(
  process: ChildProcess,
  SIGTERMTimeout = 4000,
): Promise<void> {
  return new Promise((resolve) => {
    if (process.exitCode !== null || process.signalCode !== null) {
      logger.warn('process already exited', { pid: process.pid });
      return resolve();
    }
    const killTimeout = setTimeout(() => {
      if (process.exitCode !== null || process.signalCode !== null) {
        logger.warn('kill timeout: process already exited', {
          pid: process.pid,
        });
        return resolve();
      }

      logger.warn('kill timeout: sending SIGKILL...', { pid: process.pid });
      process.kill('SIGKILL');
    }, SIGTERMTimeout);

    process.removeAllListeners();
    process.once('exit', (code: number | null, signal: string | null) => {
      logger.info('stopped', { pid: process.pid, code, signal });
      if (killTimeout) clearTimeout(killTimeout);
      resolve();
    });
    process.kill();
  });
}
