import { Addrs } from "../addrs";

// Enabling this will skip the abnormalStatusLimitWithBossFlagSub1() so can only have one.
export function disableAbnormalStatusLimitWithBossFlag(){
    Memory.patchCode(Addrs.AbnormalStatus.BossFlagCheck, 1, (code) => {
        code.writeU8(0xEB); //Replace JZ with JMP (param_2 + 0x420 is mons flags). param_2 for this function is BattleCharacter
    });
}

export function abnormalStatusTurnsWithBossFlagMinusOne(){
    Memory.patchCode(Addrs.AbnormalStatus.SetAbnormalStatusTurnsToOne, 8,(code) => {
        code.writeU8(0x83); //SUB EDI,0x1 0x83EF019090909090
        code.add(1).writeU8(0xEF);
        code.add(2).writeU8(0x01);
        code.add(3).writeU8(0x90); // No op
        code.add(4).writeU32(0x90909090) // No op
    });
}