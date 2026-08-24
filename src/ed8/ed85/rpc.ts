import { ScriptManager } from "./types/scriptManager";
import { ScriptId } from "./types/consts";

rpc.exports = {
    // Needed as load does not happen before injecting frida by CLI.
    loadScripts: function() {
        ScriptManager.initDebug();
        ScriptManager.initCustom();
    },
    callFunc: function(scriptId: ScriptId, funcName: string) {
        ScriptManager.getScriptByID(scriptId)?.call(ScriptManager.getThreadContext(), funcName, 0, 1);
    },
    callExternalFunc: function(code: string) {
        ScriptManager.callExternalScenaCode(code);
    },
    // setupOpcodeHook: function(start: number, end: number, code: string, scriptName: string = "", funcName: string = "") {
    //     addOpcodeHook(start, end, code, scriptName, funcName);
    // },
    // resetOpcodeHook: function() {
    //     resetOpcodeHooks()
    // }
};