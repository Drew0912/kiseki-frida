import * as utils from "../../utils";

// (new NativeFunction(Process.getModuleByName('KERNEL32.dll').getExportByName('AllocConsole'), 'bool', []))();
utils.log("Hello World from Frida!");

import { LoggerLevel, setupOutputDebugInfo } from "./mods/logger";
import { hookDebug } from "./mods/debugScripts";
import { hookScriptExtender } from "./mods/scriptExtender";

import { ScriptManager } from "./types/scriptManager";
import { ScriptId } from "./types/types";
import { addOpcodeHook, resetOpcodeHooks } from "./mods/scriptExtender";
import { abnormalStatusTurnsWithBossFlagMinusOne } from "./mods/abnormalStatusWithBossFlag";
import { braveOrderDownOnEnemy } from "./mods/braveOrderDurationDownOnEnemyTurn";

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


function main() {
    setupOutputDebugInfo(LoggerLevel.OutputPrintf);
    hookScriptExtender();
    hookDebug();

    abnormalStatusTurnsWithBossFlagMinusOne();
    braveOrderDownOnEnemy();
}

main();
