import { ScriptManager } from "./types/scriptManager";
import { ScriptId } from "./types/consts";

import { Addrs, Offsets } from "./addrs";

import { BattleCharacter } from "./types/battleCharacter";
import { BattleProc } from "./types/battleProc";

const setMQ = new NativeFunction(Addrs.BattleCharacter.SetMasterQuartzData, 'void', ['pointer', 'int16', 'int16']);

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
    enemyMQTest: function(MQID: number) {
        const chr = BattleProc.getBattleCharWorkForEnemyNumber(0xF043)!;
        // const chr = BattleProc.getBattleCharWorkForPartyNumber(0)!;
        const skuldID = 0x0DF3; // auto HP regen
        const siriusID = 0x0DF4;
        const devaID = 0x0DF5; // recover HP based on attack damage
        const brigidID = 0x0DF2; // auto cp regen
        const murakumoID = 0x0E27; // attacks inflict abnormalities
        const katzeID = 0x0E00; // absorbs magic attacks
        const pixieID = 0x0E26; //CP and EP on arts
        setMQ(chr.add(Offsets.BattleCharacter.MasterQuartzDataTableMain).readPointer(), MQID, 0)
        // setMQ(chr.add(Offsets.BattleCharacter.MasterQuartzDataTableSubMaybe), devaID, 1)
    },
};