# graceful-kill [![NPM version][npm-image]][npm-url]

gracefully kills a spawn process

[![Dependency ci Status][dependencyci-image]][dependencyci-url]
[![Dependency Status][daviddm-image]][daviddm-url]

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

[npm-image]: https://img.shields.io/npm/v/graceful-kill.svg?style=flat-square
[npm-url]: https://npmjs.org/package/graceful-kill
[daviddm-image]: https://david-dm.org/christophehurpeau/undefined.svg?style=flat-square
[daviddm-url]: https://david-dm.org/christophehurpeau/undefined
[dependencyci-image]: https://dependencyci.com/github/christophehurpeau/undefined/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/christophehurpeau/undefined
