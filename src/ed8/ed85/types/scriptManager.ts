import { Addrs, Offsets } from "../addrs";
import { Script } from "../types/script";
import { ScriptId } from "./types";
import { ED85 } from "./ed85";
import { BattleProc } from "./battleProc";
import { isPathExists } from "../../../utils";

import * as utils from "../../../utils";

export class ScriptManager extends NativePointer {
    private static _getScriptByID = new NativeFunction(Addrs.ScriptManager.GetScriptByID, "pointer", ['pointer', 'pointer', 'uint16'], 'win64');
    static getScriptByID(id: ScriptId): Script | undefined {
        const scr = ScriptManager._getScriptByID(ScriptManager.getThreadContext(), ScriptManager.getThreadContext(), id);
        return scr.isNull() ? undefined : new Script(scr);
    }

    static getThreadContext(threadId = 0): NativePointer {
        return ED85.scriptManager.add(Offsets.ScriptManager.ThreadContext + threadId * Offsets.ScriptManager.SizeOfThreadContext);
    }

    // private static _initED8Script = new NativeFunction(Addrs.ScriptManager.InitED8Script, 'void', ['pointer'], 'win64'); // Not needed.
    private static _initED8ScriptAndScriptScn = new NativeFunction(Addrs.ScriptManager.InitED8ScriptAndScriptScn, 'void', ['pointer'], 'win64');

    private static debugMem = Memory.alloc(Script.SIZE);
    private static debugScript = new Script(ScriptManager.debugMem);
    static initDebug(): void {
        // Memory.protect(customMem, debugMemSize, 'rw-')
        this._initED8ScriptAndScriptScn(ScriptManager.debugScript);
        // utils.log("[*] ScriptManager.initDebug Memory.alloc success!");

        const path = 'bin/Win64/debug.dat'
        if (isPathExists(path)){
            this.debugScript.load(path, 0xFFFFFFFF, false);
        }
        else {
            const defaultPath = 'data/scripts/scena/dat_en/debug.dat';
            this.debugScript.load(defaultPath, 0xFFFFFFFF, false);
        }

        // utils.log("[*] ScriptManager.initDebug Finished!")
    }
    static get debug(): Script {
        return this.debugScript;
    }

    // Script for calling external scena code. Not used naturally in game.
    private static customMem = Memory.alloc(Script.SIZE);
    private static customScript = new Script(ScriptManager.customMem);
    static initCustom(): void {
        this._initED8ScriptAndScriptScn(ScriptManager.customScript);
        // utils.log("[*] ScriptManager.initCustom Memory.alloc success!");

        this.customScript.load('bin/Win64/custom.dat', 0xFFFFFFFF, false);
        // utils.log("[*] ScriptManager.initCustom Finished!")
    }

    private static readonly CUSTOM_DAT_HEADER = [
        0x20, 0x00, 0x00, 0x00, 0x20, 0x00, 0x00, 0x00,
        0x28, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00,
        0x2C, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00,
        0x39, 0x00, 0x00, 0x00, 0x00, 0xEF, 0xCD, 0xAB,
        0x63, 0x75, 0x73, 0x74, 0x6F, 0x6D, 0x00, 0x00,
        0x3C, 0x00, 0x00, 0x00, 0x2E, 0x00, 0x46, 0x72,
        0x69, 0x64, 0x61, 0x5F, 0x46, 0x75, 0x6E, 0x63,
        0x00, 0x00, 0x00, 0x00
    ];
    private static readonly RETURN_OPCODE = [ 0x01 ];
    static callExternalScenaCode(code: string) {
        const tempCode = this.CUSTOM_DAT_HEADER.concat(utils.hexStringToArray(code), this.RETURN_OPCODE);
        const tempArray = utils.arrayToBytes(tempCode);
        (this.customScript.ptrToScriptInMemory).writePointer(tempArray.unwrap());
        this.customScript.call(ScriptManager.getThreadContext(), 'Frida_Func', 0, 1);
    }


    static get battleProc(): BattleProc {
        return new BattleProc(ED85.scriptManager.add(Offsets.ScriptManager.BattleProc).readPointer());
    }

    // Below scripts not accessed by kiseki-frida.
    static get common(): Script {
        return new Script(ED85.scriptManager.add(Offsets.ScriptManager.Scripts.common));
    }
    static get system2(): Script {
        return new Script(ED85.scriptManager.add(Offsets.ScriptManager.Scripts.system2));
    }
    static get system3(): Script {
        return new Script(ED85.scriptManager.add(Offsets.ScriptManager.Scripts.system3));
    }
    static get system4(): Script {
        return new Script(ED85.scriptManager.add(Offsets.ScriptManager.Scripts.system4));
    }
    static get btlsys(): Script {
        return new Script(ED85.scriptManager.add(Offsets.ScriptManager.Scripts.btlsys));
    }
    static get btlwin(): Script {
        return new Script(ED85.scriptManager.add(Offsets.ScriptManager.Scripts.btlwin));
    }
    static get btlcom(): Script {
        return new Script(ED85.scriptManager.add(Offsets.ScriptManager.Scripts.btlcom));
    }
    static get sound(): Script {
        return new Script(ED85.scriptManager.add(Offsets.ScriptManager.Scripts.sound));
    }
    static get tk_common(): Script {
        return new Script(ED85.scriptManager.add(Offsets.ScriptManager.Scripts.tk_common));
    }

    
}

/*
Test scena codes:
const RETURN_TO_TITLE = "02000000ff0a46435f4576656e74456e644d61704368616e67650002dd7469746c6500dd0001";
*/