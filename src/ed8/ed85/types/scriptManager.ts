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

    // private static ptrToCustom: Script = ScriptManager.initED8ScriptAndScriptScn();


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