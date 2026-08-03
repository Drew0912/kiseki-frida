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

const efficacyPropertyMap = {
    [AbnormalStatusEfficacy.Poison]: "poisonEfficacy",
    [AbnormalStatusEfficacy.Seal]: "sealEfficacy",
    [AbnormalStatusEfficacy.Mute]: "muteEfficacy",
    [AbnormalStatusEfficacy.Blind]: "blindEfficacy",
    [AbnormalStatusEfficacy.Sleep]: "sleepEfficacy",
    [AbnormalStatusEfficacy.Burn]: "burnEfficacy",
    [AbnormalStatusEfficacy.Freeze]: "freezeEfficacy",
    [AbnormalStatusEfficacy.Petrify]: "petrifyEfficacy",
    [AbnormalStatusEfficacy.Faint]: "faintEfficacy",
    [AbnormalStatusEfficacy.Confuse]: "confuseEfficacy",
    [AbnormalStatusEfficacy.Charm]: "charmEfficacy",
    [AbnormalStatusEfficacy.Deathblow]: "deathblowEfficacy",
    [AbnormalStatusEfficacy.Nightmare]: "nightmareEfficacy",
    [AbnormalStatusEfficacy.Delay]: "delayEfficacy",
    [AbnormalStatusEfficacy.Vanish]: "vanishEfficacy",
} as const;

function changePartyAbnormalStatusEfficacy(effect: number, value: number) {
    const property = efficacyPropertyMap[effect as keyof typeof efficacyPropertyMap];

    if (!property)
        return;

    const oriValues = Array(8).fill(-1);

    for (let i = 0; i < BattleProc.numOfPartyMembers; i++) {
        const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
        if (!partyBattleChar)
            continue;

        utils.log(`(${partyBattleChar.character.name}:${i}) ${property} original value: ${partyBattleChar[property]}`);
        oriValues[i] = partyBattleChar[property];
        partyBattleChar[property] = value;
        utils.log(`(${partyBattleChar.character.name}:${i}) ${property} new value: ${partyBattleChar[property]}`);
    }

    effList.push({
        abnormalStatus: Number(effect),
        originalValues: oriValues,
    });

    isChanged = true;
}

export function resetPartyEfficacy() {
    if (!isChanged)
        return;

    const numOfPartyMembers = BattleProc.numOfPartyMembers;

    for (const effect of effList) {
        const property = efficacyPropertyMap[
            effect.abnormalStatus as keyof typeof efficacyPropertyMap
        ];

        if (!property)
            continue;

        for (let i = 0; i < numOfPartyMembers; i++) {
            const partyBattleChar = BattleProc.getBattleCharWorkForPartyNumber(i);
            if (!partyBattleChar)
                continue;

            utils.log(`(${partyBattleChar.character.name}:${i}) ${property} modified value: ${partyBattleChar[property]}`);
            partyBattleChar[property] = effect.originalValues[i];
            utils.log(`(${partyBattleChar.character.name}:${i}) ${property} restored value: ${partyBattleChar[property]}`);
        }
    }
    utils.log("Finished Kiseki-Frida.hookBraveOrderEffect.resetPartyEfficacy()");
    // Reset stored data.
    effList = [];
    isChanged = false;
}
