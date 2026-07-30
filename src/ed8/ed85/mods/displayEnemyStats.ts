import { ED85 } from "../types/ed85";
import { BattleProc } from "../types/battleProc";
import * as utils from "../../../utils";

export function displayEnemyCPByName(pseudoChrId: number) {
    const enemyBattleChar = BattleProc.getBattleCharWorkForEnemyNumber(pseudoChrId);
    if (!enemyBattleChar) {
        utils.log("ED8Frida.displayEnemyStats.displayEnemyCPByName() failed. Should not happen as fixed, enemyBattleChar undefined.")
        // utils.log(`BattleProc Address: ${ED85.battleProc.pointer.toString()}`);
        return;
    }

    if (enemyBattleChar.character.name.includes('-')) {
        const originalName = enemyBattleChar.character.name.slice(0, enemyBattleChar.character.name.indexOf('-'));
        enemyBattleChar.character.name = `${originalName}- CP: ${enemyBattleChar.currentCP}`;
    }
    else {
        enemyBattleChar.character.name = `${enemyBattleChar.character.name} - CP: ${enemyBattleChar.currentCP}`;
    }
}

// Crashes often. Not implemented
export function replaceDescriptionWithEnemyStats(pseudoChrId: number) {
    const enemyBattleChar = BattleProc.getBattleCharWorkForEnemyNumber(pseudoChrId);
    if (!enemyBattleChar) {
        utils.log("ED8Frida.advancedEnemyStats.replaceDescriptionWithEnemyStats() failed. Should not happen as fixed, enemyBattleChar undefined.")
        // utils.log(`BattleProc Address: ${ED85.battleProc.pointer.toString()}`);
        return;
    }

    // utils.log(ED85.battleProc.BattleATManager.toString());
    // utils.log(ED85.battleProc.BattleATManager.pointer.add(0x358).readPointer().toString()); //UIBtlATIcon
    // utils.log(ED85.battleProc.BattleATManager.pointer.add(0x358).readPointer().add(0x35C).readU32().toString()); //Action value.

    // enemyBattleChar.description = `STR: ${enemyBattleChar.str}, DEF: ${enemyBattleChar.def}\nATS: ${enemyBattleChar.ats}, ADF: ${enemyBattleChar.adf}\nSPD: ${enemyBattleChar.spd}, MOV: ${enemyBattleChar.mov}\nEVA: ${enemyBattleChar.eva}`;
}