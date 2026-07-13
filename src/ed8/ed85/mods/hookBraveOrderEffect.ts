import { BattleProc } from "../types/battleProc";
import * as utils from "../../../utils";

let isChanged = false;

interface IAbnormalStatusData {
    abnormalStatus: number,
    originalValues: number[],
}
let effList : IAbnormalStatusData[] = []

enum AbnormalStatusEfficacy {
    Poison              = 0x00000001,
    Seal                = 0x00000002,
    Mute                = 0x00000004,
    Blind               = 0x00000008,
    Sleep               = 0x00000010,
    Burn                = 0x00000020,
    Freeze              = 0x00000040,
    Petrify             = 0x00000080,
    Faint               = 0x00000100,
    Confuse             = 0x00000200,
    Charm               = 0x00000400,
    Deathblow           = 0x00000800,
    Nightmare           = 0x00001000,
    Delay               = 0x00002000,
    Vanish              = 0x00004000,
    BalanceDown         = 0x40000000, // to do
    // add stat down
}



export function initBraveOrderEffect(str: string) {
    const inputs = str.split(',');

    // ("AbnormalStatus", 0x1, value)
    if (inputs[0].slice(1, -1) == 'AbnormalStatus') {
        let effect = Number(inputs[1]);
        let value = Number(inputs[2]);
        for(let eff in AbnormalStatusEfficacy) {
            if(effect & Number(eff)) {
                changePartyAbnormalStatusEfficacy(Number(eff), value);
            }
        }
    }


}

function changePartyAbnormalStatusEfficacy(effect: number, value: number){
    const numOfPartyMembers = BattleProc.numOfPartyMembers;

    if (effect == AbnormalStatusEfficacy.Poison) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Poison AbnormalStatus efficacy original value: ${partyBattleChar.poisonEfficacy}`);
                oriValues[i] = partyBattleChar.poisonEfficacy;
                partyBattleChar.poisonEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Poison AbnormalStatus efficacy new value: ${partyBattleChar.poisonEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Seal) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Seal AbnormalStatus efficacy original value: ${partyBattleChar.sealEfficacy}`);
                oriValues[i] = partyBattleChar.sealEfficacy;
                partyBattleChar.sealEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Seal AbnormalStatus efficacy new value: ${partyBattleChar.sealEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Mute) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Mute AbnormalStatus efficacy original value: ${partyBattleChar.muteEfficacy}`);
                oriValues[i] = partyBattleChar.muteEfficacy;
                partyBattleChar.muteEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Mute AbnormalStatus efficacy new value: ${partyBattleChar.muteEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Blind) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Blind AbnormalStatus efficacy original value: ${partyBattleChar.blindEfficacy}`);
                oriValues[i] = partyBattleChar.blindEfficacy;
                partyBattleChar.blindEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Blind AbnormalStatus efficacy new value: ${partyBattleChar.blindEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Sleep) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Sleep AbnormalStatus efficacy original value: ${partyBattleChar.sleepEfficacy}`);
                oriValues[i] = partyBattleChar.sleepEfficacy;
                partyBattleChar.sleepEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Sleep AbnormalStatus efficacy new value: ${partyBattleChar.sleepEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Burn) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Burn AbnormalStatus efficacy original value: ${partyBattleChar.burnEfficacy}`);
                oriValues[i] = partyBattleChar.burnEfficacy;
                partyBattleChar.burnEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Burn AbnormalStatus efficacy new value: ${partyBattleChar.burnEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Freeze) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Freeze AbnormalStatus efficacy original value: ${partyBattleChar.freezeEfficacy}`);
                oriValues[i] = partyBattleChar.freezeEfficacy;
                partyBattleChar.freezeEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Freeze AbnormalStatus efficacy new value: ${partyBattleChar.freezeEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Petrify) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Petrify AbnormalStatus efficacy original value: ${partyBattleChar.petrifyEfficacy}`);
                oriValues[i] = partyBattleChar.petrifyEfficacy;
                partyBattleChar.petrifyEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Petrify AbnormalStatus efficacy new value: ${partyBattleChar.petrifyEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Faint) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Faint AbnormalStatus efficacy original value: ${partyBattleChar.faintEfficacy}`);
                oriValues[i] = partyBattleChar.faintEfficacy;
                partyBattleChar.faintEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Faint AbnormalStatus efficacy new value: ${partyBattleChar.faintEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Confuse) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Confuse AbnormalStatus efficacy original value: ${partyBattleChar.confuseEfficacy}`);
                oriValues[i] = partyBattleChar.confuseEfficacy;
                partyBattleChar.confuseEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Confuse AbnormalStatus efficacy new value: ${partyBattleChar.confuseEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Charm) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Charm AbnormalStatus efficacy original value: ${partyBattleChar.charmEfficacy}`);
                oriValues[i] = partyBattleChar.charmEfficacy;
                partyBattleChar.charmEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Charm AbnormalStatus efficacy new value: ${partyBattleChar.charmEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Deathblow) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Deathblow AbnormalStatus efficacy original value: ${partyBattleChar.deathblowEfficacy}`);
                oriValues[i] = partyBattleChar.deathblowEfficacy;
                partyBattleChar.deathblowEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Deathblow AbnormalStatus efficacy new value: ${partyBattleChar.deathblowEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Nightmare) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Nightmare AbnormalStatus efficacy original value: ${partyBattleChar.nightmareEfficacy}`);
                oriValues[i] = partyBattleChar.nightmareEfficacy;
                partyBattleChar.nightmareEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Nightmare AbnormalStatus efficacy new value: ${partyBattleChar.nightmareEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Delay) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Delay AbnormalStatus efficacy original value: ${partyBattleChar.delayEfficacy}`);
                oriValues[i] = partyBattleChar.delayEfficacy;
                partyBattleChar.delayEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Delay AbnormalStatus efficacy new value: ${partyBattleChar.delayEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }
    else if (effect == AbnormalStatusEfficacy.Vanish) {
        let oriValues = [-1, -1, -1, -1, -1, -1, -1, -1];
        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (partyBattleChar) {
                // utils.log(`(${partyBattleChar.character.name}:${i}) Vanish AbnormalStatus efficacy original value: ${partyBattleChar.vanishEfficacy}`);
                oriValues[i] = partyBattleChar.vanishEfficacy;
                partyBattleChar.vanishEfficacy = value;
                // utils.log(`(${partyBattleChar.character.name}:${i}) Vanish AbnormalStatus efficacy new value: ${partyBattleChar.vanishEfficacy}`);
            }
        }
        effList.push({abnormalStatus : Number(effect), originalValues : oriValues});
    }

    isChanged = true;

    
}

export function resetPartyEfficacy() {
    if (isChanged == false) {
        return;
    }

    const numOfPartyMembers = BattleProc.numOfPartyMembers;

    // Reset Abnormal Statuses
    for (let i = 0; i < effList.length; i++) {
        if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Poison) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Poison AbnormalStatus efficacy modified value: ${partyBattleChar.poisonEfficacy}`);
                    partyBattleChar.poisonEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Poison AbnormalStatus efficacy restored value: ${partyBattleChar.poisonEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Seal) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Seal AbnormalStatus efficacy modified value: ${partyBattleChar.sealEfficacy}`);
                    partyBattleChar.sealEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Seal AbnormalStatus efficacy restored value: ${partyBattleChar.sealEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Mute) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Mute AbnormalStatus efficacy modified value: ${partyBattleChar.muteEfficacy}`);
                    partyBattleChar.muteEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Mute AbnormalStatus efficacy restored value: ${partyBattleChar.muteEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Blind) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Blind AbnormalStatus efficacy modified value: ${partyBattleChar.blindEfficacy}`);
                    partyBattleChar.blindEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Blind AbnormalStatus efficacy restored value: ${partyBattleChar.blindEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Sleep) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Sleep AbnormalStatus efficacy modified value: ${partyBattleChar.sleepEfficacy}`);
                    partyBattleChar.sleepEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Sleep AbnormalStatus efficacy restored value: ${partyBattleChar.sleepEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Burn) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Burn AbnormalStatus efficacy modified value: ${partyBattleChar.burnEfficacy}`);
                    partyBattleChar.burnEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Burn AbnormalStatus efficacy restored value: ${partyBattleChar.burnEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Freeze) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Freeze AbnormalStatus efficacy modified value: ${partyBattleChar.freezeEfficacy}`);
                    partyBattleChar.freezeEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Freeze AbnormalStatus efficacy restored value: ${partyBattleChar.freezeEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Petrify) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Petrify AbnormalStatus efficacy modified value: ${partyBattleChar.petrifyEfficacy}`);
                    partyBattleChar.petrifyEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Petrify AbnormalStatus efficacy restored value: ${partyBattleChar.petrifyEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Faint) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Faint AbnormalStatus efficacy modified value: ${partyBattleChar.faintEfficacy}`);
                    partyBattleChar.faintEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Faint AbnormalStatus efficacy restored value: ${partyBattleChar.faintEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Confuse) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Confuse AbnormalStatus efficacy modified value: ${partyBattleChar.confuseEfficacy}`);
                    partyBattleChar.confuseEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Confuse AbnormalStatus efficacy restored value: ${partyBattleChar.confuseEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Charm) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Charm AbnormalStatus efficacy modified value: ${partyBattleChar.charmEfficacy}`);
                    partyBattleChar.charmEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Charm AbnormalStatus efficacy restored value: ${partyBattleChar.charmEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Deathblow) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Deathblow AbnormalStatus efficacy modified value: ${partyBattleChar.deathblowEfficacy}`);
                    partyBattleChar.deathblowEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Deathblow AbnormalStatus efficacy restored value: ${partyBattleChar.deathblowEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Nightmare) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Nightmare AbnormalStatus efficacy modified value: ${partyBattleChar.nightmareEfficacy}`);
                    partyBattleChar.nightmareEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Nightmare AbnormalStatus efficacy restored value: ${partyBattleChar.nightmareEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Delay) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Delay AbnormalStatus efficacy modified value: ${partyBattleChar.delayEfficacy}`);
                    partyBattleChar.delayEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Delay AbnormalStatus efficacy restored value: ${partyBattleChar.delayEfficacy}`);
                }
            }
        }
        else if (effList[i].abnormalStatus == AbnormalStatusEfficacy.Vanish) {
            for (let j = 0; j < numOfPartyMembers; j++) {
                const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(j);
                if (partyBattleChar) {
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Vanish AbnormalStatus efficacy modified value: ${partyBattleChar.vanishEfficacy}`);
                    partyBattleChar.vanishEfficacy = effList[i].originalValues[j];
                    // utils.log(`(${partyBattleChar.character.name}:${j}) Vanish AbnormalStatus efficacy restored value: ${partyBattleChar.vanishEfficacy}`);
                }
            }
        }
    }

    utils.log('Finished resetPartyEfficacy');
    // Reset stored data.
    effList = []
    isChanged = false;
}