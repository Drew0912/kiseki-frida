import { Addrs } from "../addrs";
import { isPathExists } from "../../../utils";

export class Script extends NativePointer {

    private static _Load = new NativeFunction(Addrs.Script.Load, "pointer", ['pointer', 'pointer', 'uint32', 'bool'], 'win64');
    private static _Call = new NativeFunction(Addrs.Script.Call, "bool", ['pointer', 'pointer', 'pointer', 'uint32', 'uint8'], 'win64');
    private static _Call2 = new NativeFunction(ptr(0x1405a2200), "bool", ['pointer', 'pointer', 'uint32', 'uint16'], 'win64');

    static readonly SIZE = 0x3218;

    load(path: string, type: number, debugLog: boolean = false): NativePointer {
        const p = Memory.allocUtf8String(path);
        return Script._Load(this, p, type, Number(debugLog));
    }

    call(context: NativePointer, func: string, arg3: number, arg4: number): boolean {
        const f = Memory.allocUtf8String(func);
        return !!Script._Call(this, context, f, arg3, arg4);
    }

    // Thread?
    // Used for functions that do not display anything on screen, i.e setting up flags.
    call2(context: NativePointer, func: string, arg3: number, arg4: number): boolean {
        const f = Memory.allocUtf8String(func);
        return !!Script._Call2(this, f, arg3, arg4);
    }
}