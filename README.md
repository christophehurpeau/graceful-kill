<h1 align="center">
  graceful-kill
</h1>

<p align="center">
  gracefully kills a spawn process
</p>

<p align="center">
  <a href="https://npmjs.org/package/graceful-kill"><img src="https://img.shields.io/npm/v/graceful-kill.svg?style=flat-square" alt="npm version"></a>
  <a href="https://npmjs.org/package/graceful-kill"><img src="https://img.shields.io/npm/dw/graceful-kill.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.org/package/graceful-kill"><img src="https://img.shields.io/node/v/graceful-kill.svg?style=flat-square" alt="node version"></a>
  <a href="https://npmjs.org/package/graceful-kill"><img src="https://img.shields.io/npm/types/graceful-kill.svg?style=flat-square" alt="types"></a>
</p>

## Install

```bash
npm install --save graceful-kill
```

## Usage

```js
import { spawn } from "child_process";
import gracefulKill from "graceful-kill";

const process = spawn("sleep", [99999]);

process.on("SIGINT", () => {
  gracefulKill(process).then(() => {
    process.exit(0);
  });
});
```
