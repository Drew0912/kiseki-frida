import { Addrs } from "../addrs";

// LinkAbility[SolidGuard] : Default take 10% damage
export function patchProtectiveWall(percentValue: number){
    // const addrs = ptr(0x14011FA3A);
    // Interceptor.attach(addrs, function() {
    //     const ctx = (this.context as X64CpuContext);
    //     const baseDamage = ctx.r8.toUInt32();

    //     utils.log(`patchProtectiveWall`);

    //     ctx.rcx = ptr(percentValue * baseDamage);
    // })

    // LEA ECX, [R8 + R8*0x4]
    // ADD ECX ECX
    // (10% damage)
    Memory.patchCode(Addrs.SolidGuardDamageCalc, 6, (code) => {
        code.writeU8(0x41);
        code.add(1).writeU8(0x6B);
        code.add(2).writeU8(0xC8);
        code.add(3).writeU8(percentValue); // imul ECX, R8D, percentValue
        code.add(4).writeU16(0x9090); // nop
    });
}

// LinkAbility[chr:Protect] : Default take 50% damage
export function patchCover(percentValue: number){
    // IMUL ECX, R8D, 0x32 (percentValue)
    Memory.patchCode(Addrs.ProtectDamageCalc, 1, (code) => {
        code.writeU8(percentValue);
    });
}