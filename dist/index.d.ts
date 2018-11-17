import { ChildProcess } from 'child_process';
declare module 'child_process' {
    interface ChildProcess {
        exitCode: number | null;
        signalCode: string | null;
    }
}
declare const _default: (process: ChildProcess, SIGTERMTimeout?: number) => Promise<{}>;
export default _default;
//# sourceMappingURL=index.d.ts.map