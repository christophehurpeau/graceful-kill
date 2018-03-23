<h3 align="center">
  graceful-kill
</h3>

<p align="center">
  gracefully kills a spawn process
</p>

<p align="center">
  <a href="https://npmjs.org/package/graceful-kill"><img src="https://img.shields.io/npm/v/graceful-kill.svg?style=flat-square"></a>
  <a href="https://david-dm.org/christophehurpeau/graceful-kill"><img src="https://david-dm.org/christophehurpeau/graceful-kill.svg?style=flat-square"></a>
  <a href="https://dependencyci.com/github/christophehurpeau/graceful-kill"><img src="https://dependencyci.com/github/christophehurpeau/graceful-kill/badge?style=flat-square"></a>
</p>

## Install

```bash
npm install --save graceful-kill
```

## Usage

```js
import { spawn } from 'child_process';
import gracefulKill from 'graceful-kill';


const process = spawn('sleep', [99999]);

process.on('SIGINT', () => {
  gracefulKill(process).then(() => {
    process.exit(0);
  });
});
```
