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



export function initBraveOrderEffect(str: string) {
    const [type, effectStr, valueStr] = str.split(',');

    // ("AbnormalStatus", 0x1, value)
    if (type.slice(1, -1) == 'AbnormalStatus') {
        const effectMask = Number(effectStr);
        const value = Number(valueStr);

        for (const effect of Object.keys(efficacyPropertyMap).map(Number)) {
            if (effectMask & effect) {
                changePartyAbnormalStatusEfficacy(effect, value);
            }   
        }
    }
}


function changePartyAbnormalStatusEfficacy(effect: number, value: number) {
    const property = efficacyPropertyMap[effect as keyof typeof efficacyPropertyMap];

    if (!property)
        return;

    const oriValues = Array(8).fill(-1);

    BattleProc.forEachPartyMember((battleChar, i) => {
        utils.log(`(${battleChar.character.name}:${i}) ${property} original value: ${battleChar[property]}`);
        oriValues[i] = battleChar[property];
        battleChar[property] = value
        utils.log(`(${battleChar.character.name}:${i}) ${property} new value: ${battleChar[property]}`);
    })

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

        BattleProc.forEachPartyMember((battleChar, i) => {
            utils.log(`(${battleChar.character.name}:${i}) ${property} modified value: ${battleChar[property]}`);
            battleChar[property] = effect.originalValues[i];
            utils.log(`(${battleChar.character.name}:${i}) ${property} restored value: ${battleChar[property]}`);
        })
    }
    utils.log("Finished Kiseki-Frida.hookBraveOrderEffect.resetPartyEfficacy()");
    // Reset stored data.
    effList = [];
    isChanged = false;
}
