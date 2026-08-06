import { BattleProc } from "../types/battleProc";
import * as utils from "../../../utils";
import { AbnormalStatusEfficacy } from "../types/consts";

// To do
// Add reset to start of battle (look into) if brave order not finished on battle end. 
// Should only need to reset stored values? and not touch BattleCharacter in mem.

let isChanged = false;

interface IAbnormalStatusData {
    abnormalStatus: number,
    isStatDown: boolean,
    originalValues: number[],
}
let effList : IAbnormalStatusData[] = []

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
    [AbnormalStatusEfficacy.Charm]: "charmEfficacy", // (not used)
    [AbnormalStatusEfficacy.Deathblow]: "deathblowEfficacy",
    [AbnormalStatusEfficacy.Nightmare]: "nightmareEfficacy",
    [AbnormalStatusEfficacy.Delay]: "delayEfficacy",
    [AbnormalStatusEfficacy.Vanish]: "vanishEfficacy", // (not used)
} as const;


export function initBraveOrderEffect(str: string) {
    // ("AbnormalStatus", effect, 0x1, value)
    const [type, effectStr, statDown, valueStr] = str.split(',');

    if (type.slice(1, -1) == 'AbnormalStatus') {
        utils.log("[KF] Starting Kiseki-Frida.hookBraveOrderEffect.initBraveOrderEffect(AbnormalStatus, ...)");
        const effectMask = Number(effectStr);
        const value = Number(valueStr);
        const isStatDown = Number(statDown) === 1;

        for (const effect of Object.keys(efficacyPropertyMap).map(Number)) {
            if (effectMask & effect) {
                changePartyAbnormalStatusEfficacy(effect, value);
            }   
        }
        if (isStatDown)
            changePartyStatDownEfficacy(value);
    }
}

function changePartyAbnormalStatusEfficacy(effect: number, value: number) {
    const property = efficacyPropertyMap[effect as keyof typeof efficacyPropertyMap];

    if (!property)
        return;

    const oriValues = Array(8).fill(-1);

    BattleProc.forEachPartyMember((battleChar, i) => {
        utils.log(`[KF] Change AbnormalStatusEfficacy: (${battleChar.character.name}:${i}) ${property} original value: ${battleChar[property]}`);
        oriValues[i] = battleChar[property];
        battleChar[property] = value
        utils.log(`[KF] Change AbnormalStatusEfficacy: (${battleChar.character.name}:${i}) ${property} new value: ${battleChar[property]}`);
    })

    effList.push({
        abnormalStatus: Number(effect),
        isStatDown: false,
        originalValues: oriValues,
    });

    isChanged = true;
}

function changePartyStatDownEfficacy(value: number) {
    const oriValues = Array(8).fill(-1);
    const property = "statDownEfficacy";

    BattleProc.forEachPartyMember((battleChar, i) => {
        utils.log(`[KF] Change AbnormalStatusEfficacy: (${battleChar.character.name}:${i}) ${property} original value: ${battleChar[property]}`);
        oriValues[i] = battleChar[property];
        battleChar[property] = value
        utils.log(`[KF] Change AbnormalStatusEfficacy: (${battleChar.character.name}:${i}) ${property} new value: ${battleChar[property]}`);
    })

    effList.push({
        abnormalStatus: 0,
        isStatDown: true,
        originalValues: oriValues,
    });

    isChanged = true;
}

export function resetPartyEfficacy() {
    if (!isChanged)
        return;

    for (const effect of effList) {
        const property = effect.isStatDown ? "statDownEfficacy" : efficacyPropertyMap[
            effect.abnormalStatus as keyof typeof efficacyPropertyMap
        ];

        if (!property)
            continue;

        BattleProc.forEachPartyMember((battleChar, i) => {
            utils.log(`[KF] Reset AbnormalStatusEfficacy: (${battleChar.character.name}:${i}) ${property} modified value: ${battleChar[property]}`);
            battleChar[property] = effect.originalValues[i];
            utils.log(`[KF] Reset AbnormalStatusEfficacy: (${battleChar.character.name}:${i}) ${property} restored value: ${battleChar[property]}`);
        })
    }
    utils.log("[KF] Finished Kiseki-Frida.hookBraveOrderEffect.resetPartyEfficacy()");
    // Reset stored data.
    effList = [];
    isChanged = false;
}
