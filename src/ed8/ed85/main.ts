import * as utils from "../../utils";
import "./rpc"

// (new NativeFunction(Process.getModuleByName('KERNEL32.dll').getExportByName('AllocConsole'), 'bool', []))();
utils.log("Hello World from Frida!");

import { LoggerLevel, setupOutputDebugInfo } from "./mods/logger";
import { hookDebug } from "./mods/debugScripts";
import { hookScriptExtender } from "./mods/scriptExtender";

import { addOpcodeHook, resetOpcodeHooks } from "./mods/scriptExtender";
import { abnormalStatusTurnsWithBossFlagMinusOne } from "./mods/abnormalStatusWithBossFlag";
import { braveOrderDownOnEnemy } from "./mods/braveOrderDurationDownOnEnemyTurn";


function main() {
    setupOutputDebugInfo(LoggerLevel.OutputPrintf);
    hookScriptExtender();
    hookDebug();

    abnormalStatusTurnsWithBossFlagMinusOne();
    braveOrderDownOnEnemy();
}

main();
