import { sprintf, vsprintf } from "sprintf-js";
import { API } from "./modules";

const Logging = !false;

export class Interceptor2 {
    static call<RetType extends NativeCallbackReturnType, ArgTypes extends NativeCallbackArgumentType[] | []> (
        target: NativePointerValue,
        replacement: NativeCallbackImplementation<
                GetNativeCallbackReturnValue<RetType>,
                Extract<GetNativeCallbackArgumentValue<ArgTypes>, unknown[]>
            >,
        retType: RetType,
        argTypes: ArgTypes,
    ) {
        Interceptor.replace(target, new NativeCallback(replacement, retType, argTypes, 'win64'));
        Interceptor.flush();
        Memory.patchCode(target, 1, (code: NativePointer) => {
            code.writeU8(0xE8);
        });
    }

    static jmp<RetType extends NativeCallbackReturnType, ArgTypes extends NativeCallbackArgumentType[] | []> (
        target: NativePointerValue,
        replacement: NativeCallbackImplementation<
                GetNativeCallbackReturnValue<RetType>,
                Extract<GetNativeCallbackArgumentValue<ArgTypes>, unknown[]>
            >,
        retType: RetType,
        argTypes: ArgTypes,
    ) {
        // Adding { exceptions: "propagate" } removes system error when creating new NativeFunctions on windows functions.
        // Issue not present on Frida 16.4.10 and older, only newer?
        const stub = new NativeFunction(target, retType, argTypes, { exceptions: "propagate" });
        Interceptor.replace(target, new NativeCallback(replacement, retType, argTypes, 'win64'));
        return stub;
    }
}

export class NativePointerObject extends NativePointer {
    private impl: NativePointer = this.add(0);

    get pointer(): NativePointer {
        return this.impl;
    }
}

export function getReturnAddress(ctx: X64CpuContext){
    log(`rsp.readPointer - ReturnAddress: ${ctx.rsp.readPointer().toString()}`);
}

// Synchronous scan using input sig string.
export function sigScan(module: Module, sig: string) : NativePointer {
    const result = Memory.scanSync(module.base, module.size, sig);
    const res = JSON.parse(JSON.stringify(result[0])); // {"address":x, "size":y}
    log(`Sig: ${sig} found at address: ${res.address}`);
    return ptr(res.address);
}

export function log(format: string, ...args: any[]): void {
    if (!Logging)
        return;

    if (args.length != 0) {
        format = vsprintf(format, args);
    }

    const now = new Date;
    const offset = (0 * 3600 - now.getTimezoneOffset()) / 3600;
    const time = sprintf('%02d:%02d:%02d.%03d', now.getHours() + offset, now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    const msg = `${time} ${format}`;
    console.log(msg);
    // send({msg: 'log', data: msg});
}

export function arrayToBytes(data: number[]): ArrayBuffer {
    const p = Memory.alloc(data.length);
    p.writeByteArray(data);

    const buf = ArrayBuffer.wrap(p, data.length);
    (buf as any).ptr = p;

    return buf;
}

export function ptrToBytes(addr: NativePointer, size: number): ArrayBuffer {
    const buf = ArrayBuffer.wrap(addr, size);
    (buf as any).ptr = addr;
    return buf;
}

export function UTF16(s: string): NativePointer {
    return s ? Memory.allocUtf16String(s) : NULL;
}

export function UTF8(s: string): NativePointer {
    return s ? Memory.allocUtf8String(s) : NULL;
}


// Function that takes in a string which contains a double in hex and returns the double.
export function hexDoubletoDouble(hexString : string): number {
    if (hexString === '0x0') {
        return 0;
    }
    let buffer = new ArrayBuffer(8);
    let hex = hexString.substring(2);
    let bytes = new Uint8Array(buffer);

    let count = 7;
    for (let c = 0; c < hex.length; c += 2) {
        bytes[count] = parseInt(hex.substring(c, c+2), 16);
        count--;
    }

    let doubles = new Float64Array(buffer);
    return doubles[0];
}

export function hexStringToArray(hexString: string): number[] {
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }

  const arr: number[] = []

  for (let i = 0; i < hexString.length; i += 2) {
    arr.push(parseInt(hexString.slice(i, i + 2), 16));
  }

  return arr;
}

export function uInt32Tofloat(num: number): number {
    let v = new DataView(new ArrayBuffer(4));
    v.setUint32(0, num);
    return v.getFloat32(0);
}

export function floatToUInt32(float: number): number {
    let v = new DataView(new ArrayBuffer(4));
    v.setFloat32(0, float);
    return v.getUint32(0);
}

export function readFileContent(path: string): ArrayBuffer | null {
    const fp = API.crt.fopen(UTF8(path), UTF8('rb')) as NativePointer;
    if (fp.isNull()) {
        return null;
    }

    const fileSize = API.crt._filelengthi64(API.crt._fileno(fp)) as UInt64;

    const p = Memory.alloc(fileSize);

    const bytesRead = API.crt.fread(p, fileSize, 1, fp);

    API.crt.fclose(fp);

    return ptrToBytes(p, fileSize.toNumber());
}

export function isPathExists(path: string): boolean {
    const INVALID_FILE_ATTRIBUTES = 0xFFFFFFFF;
    return API.WIN32.GetFileAttributesA(Memory.allocAnsiString(path)) != INVALID_FILE_ATTRIBUTES;
}

class TLS {
    disableDecrypt  : boolean = false;
    patchFileName   : string = '';
}

const tls: {[key: number]: TLS} = {};

export function getTLS(): TLS {
    const tid = Process.getCurrentThreadId();

    if (!tls[tid])
        tls[tid] = new TLS;

    return tls[tid];
}

export function getGameVersion(): string {
    const exe = Process.enumerateModules()[0].base;

    const header = exe.add(exe.add(0x3C).readU32());
    const timestamp = header.add(8).readU32();

    switch (timestamp) {
        case 0x6079B2A5: return 'ed84_jp';
        case 0x6079B1DF: return 'ed84_us';
        case 0x60767137: return 'ed83_cn';
        case 0x62DA17AE: return 'ed9';
        case 0x65D7A473:
            log("Detected Reverie v1.1.4");
            return 'ed85_v114'; //NISA Reverie version 1.1.4
        case 0x674EDE3F:
            log("Detected Reverie v1.1.5");
            return 'ed85_v115'; //NISA Reverie version 1.1.5
    }

    throw new Error('unknown game version');
}

let patchDirs = [
    'dev/',
    'patch/',
    'mod/',
    'data/',
];

export function setPatchDirs(dirs: string[]) {
    if (dirs?.length) {
        patchDirs = dirs;
        if (!patchDirs.includes('data/'))
            patchDirs.push('data/');
        log(`new patch dirs: ${patchDirs}`);
    }
}

export function getPatchFilePath(path: string): string | null {
    // All unedited file paths start with 'data/'.
    if (path.slice(0, 5) != 'data/') {
        return null;
    }

    for (let dir of patchDirs) {
        const patchPath = dir + path.slice(5);
        if (isPathExists(patchPath)) {
            // log(`patch: ${patchPath}`);
            return patchPath;
        }
    }

    return null;
}

export function loadPatchFile(path: string): ArrayBuffer | null {
    const patchPath = getPatchFilePath(path);

    if (!patchPath)
        return null;

    let data = readFileContent(patchPath);

    return data;
}
