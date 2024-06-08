import type { ChildProcess } from "node:child_process";
import { expect, it, vi } from "vitest";
import { gracefulKill } from ".";

const createProcessMock = (): ChildProcess => {
  return {
    exitCode: null,
    signalCode: null,
    kill: vi.fn(),
    removeAllListeners: vi.fn(),
    once: vi.fn(),
  } as unknown as ChildProcess;
};

it("should do nothing if process is already killed by exitCode", async () => {
  const processMock = createProcessMock();
  (processMock as any).exitCode = 1;
  const result = await gracefulKill(processMock);
  expect(processMock.kill).toBeCalledTimes(0);
  expect(result).toBe(undefined);
});

it("should do nothing if process is already killed by signalCode", async () => {
  const processMock = createProcessMock();
  (processMock as any).signalCode = "SIGTERM";
  const result = await gracefulKill(processMock);
  expect(processMock.kill).toBeCalledTimes(0);
  expect(result).toBe(undefined);
});
