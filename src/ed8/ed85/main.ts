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
import { Addrs } from "./addrs";
import { Interceptor2 } from "../../utils";


function main() {
    setupOutputDebugInfo(LoggerLevel.OutputPrintf);
    hookScriptExtender();
    hookDebug();

    abnormalStatusTurnsWithBossFlagMinusOne();
    braveOrderDownOnEnemy();

    // const ScriptManager_GetScriptById = Interceptor2.jmp(
    //     Addrs.BattleCharacter.SetMasterQuartzData,
    //     function(btlChr: NativePointer, MQID: number, c: number): void {
    //         const skuldID = 0x0DF3;
    //         const siriusID = 0x0DF4;
    //         const devaID = 0x0DF5;
    //         utils.log(`MQ Debug ${MQID}`)
    //         ScriptManager_GetScriptById(btlChr, 0x9999, c);
    //     },
    //     'void', ['pointer', 'uint16', 'uint16'],
    // );
}

main();
