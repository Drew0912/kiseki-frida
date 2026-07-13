import { NativePointerObject } from "../../../utils";
import { Addrs, Offsets } from "../addrs";
import { Character } from "./character";


export class BattleCharacter extends NativePointer {
    isValid(): boolean {
        return this.readPointer().equals(Addrs.VFTable.BattleCharWork);
    }

    // // Should not be needed as there is a static way to get.
    // get battleProc(): BattleProc {
    //     return new BattleProc(this.readPointer(Offsets.BattleCharacter.BattleProc));
    // }

    get character(): Character {
        return new Character(this.add(Offsets.BattleCharacter.Character).readPointer());
    }

    // // Values that can be edited live in battle.
    // get currentHP(): number {
    //     return this.readU32(Offsets.BattleCharacter.CurrentHP);
    // }

    // set currentHP(value: number) {
    //     this.writeU32(Offsets.BattleCharacter.CurrentHP, value);
    // }

    // get maxHP(): number {
    //     return this.readU32(Offsets.BattleCharacter.MaxHP);
    // }

    // set maxHP(value: number) {
    //     this.writeU32(Offsets.BattleCharacter.MaxHP, value);
    // }

    // get currentEP(): number {
    //     return this.readU16(Offsets.BattleCharacter.CurrentEP);
    // }

    // set currentEP(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.CurrentEP, value);
    // }

    // get maxEP(): number {
    //     return this.readU16(Offsets.BattleCharacter.MaxEP);
    // }

    // set maxEP(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.MaxEP, value);
    // }

    // get currentCP(): number {
    //     return this.readU16(Offsets.BattleCharacter.CurrentCP);
    // }

    // set currentCP(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.CurrentCP, value);
    // }

    // get maxCP(): number {
    //     return this.readU16(Offsets.BattleCharacter.MaxCP);
    // }

    // set maxCP(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.MaxCP, value);
    // }

    // get flags(): number {
    //     return this.readU32(Offsets.BattleCharacter.Flags);
    // }

    // set flags(value: number) {
    //     this.writeU32(Offsets.BattleCharacter.Flags, value);
    // }

    // get str(): number {
    //     return this.readU32(Offsets.BattleCharacter.STR);
    // }

    // set str(value: number) {
    //     this.writeU32(Offsets.BattleCharacter.STR, value);
    // }

    // get def(): number {
    //     return this.readU32(Offsets.BattleCharacter.DEF);
    // }

    // set def(value: number) {
    //     this.writeU32(Offsets.BattleCharacter.DEF, value);
    // }

    // get ats(): number {
    //     return this.readU32(Offsets.BattleCharacter.ATS);
    // }

    // set ats(value: number) {
    //     this.writeU32(Offsets.BattleCharacter.ATS, value);
    // }

    // get adf(): number {
    //     return this.readU32(Offsets.BattleCharacter.ADF);
    // }

    // set adf(value: number) {
    //     this.writeU32(Offsets.BattleCharacter.ADF, value);
    // }

    // get spd(): number {
    //     return this.readU16(Offsets.BattleCharacter.SPD);
    // }

    // set spd(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.SPD, value);
    // }

    // get mov(): number {
    //     return this.readU16(Offsets.BattleCharacter.MOV);
    // }

    // set mov(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.MOV, value);
    // }

    // get currentBreak(): number {
    //     return this.readU32(Offsets.BattleCharacter.CurrentBreak);
    // }

    // set currentBreak(value: number) {
    //     this.writeU32(Offsets.BattleCharacter.CurrentBreak, value);
    // }

    // get maxBreak(): number {
    //     return this.readU32(Offsets.BattleCharacter.MaxBreak);
    // }

    // set maxBreak(value: number) {
    //     this.writeU32(Offsets.BattleCharacter.MaxBreak, value);
    // }

    // // agl has some problems.
    // get agl(): number {
    //     return this.readU8(Offsets.BattleCharacter.AGL);
    // }

    // set agl(value: number) {
    //     this.writeU8(Offsets.BattleCharacter.AGL, value);
    // }

    // get eva(): number {
    //     return this.readU8(Offsets.BattleCharacter.EVA);
    // }

    // set eva(value: number) {
    //     this.writeU8(Offsets.BattleCharacter.EVA, value);
    // }

    // get exp(): number {
    //     return this.readU32(Offsets.BattleCharacter.EXP);
    // }

    // set exp(value: number) {
    //     this.writeU32(Offsets.BattleCharacter.EXP, value);
    // }

    // get lvl(): number {
    //     return this.readU32(Offsets.BattleCharacter.LVL); // Check this is U32.
    // }

    // set lvl(value: number) {
    //     this.writeU32(Offsets.BattleCharacter.LVL, value); // Check this is U32.
    // }

    get poisonEfficacy(): number {
        return this.add(Offsets.BattleCharacter.PoisonEfficacy).readU8();
    }

    set poisonEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.PoisonEfficacy).writeU8(value);
    }

    get sealEfficacy(): number {
        return this.add(Offsets.BattleCharacter.SealEfficacy).readU8();
    }

    set sealEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.SealEfficacy).writeU8(value);
    }

    get muteEfficacy(): number {
        return this.add(Offsets.BattleCharacter.MuteEfficacy).readU8();
    }

    set muteEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.MuteEfficacy).writeU8(value);
    }

    get blindEfficacy(): number {
        return this.add(Offsets.BattleCharacter.BlindEfficacy).readU8();
    }

    set blindEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.BlindEfficacy).writeU8(value);
    }

    get sleepEfficacy(): number {
        return this.add(Offsets.BattleCharacter.SleepEfficacy).readU8();
    }

    set sleepEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.SleepEfficacy).writeU8(value);
    }

    get burnEfficacy(): number {
        return this.add(Offsets.BattleCharacter.BurnEfficacy).readU8();
    }

    set burnEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.BurnEfficacy).writeU8(value);
    }

    get freezeEfficacy(): number {
        return this.add(Offsets.BattleCharacter.FreezeEfficacy).readU8();
    }

    set freezeEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.FreezeEfficacy).writeU8(value);
    }

    get petrifyEfficacy(): number {
        return this.add(Offsets.BattleCharacter.PetrifyEfficacy).readU8();
    }

    set petrifyEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.PetrifyEfficacy).writeU8(value);
    }

    get faintEfficacy(): number {
        return this.add(Offsets.BattleCharacter.FaintEfficacy).readU8();
    }

    set faintEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.FaintEfficacy).writeU8(value);
    }

    get confuseEfficacy(): number {
        return this.add(Offsets.BattleCharacter.ConfuseEfficacy).readU8();
    }

    set confuseEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.ConfuseEfficacy).writeU8(value);
    }

    get charmEfficacy(): number {
        return this.add(Offsets.BattleCharacter.CharmEfficacy).readU8();
    }

    set charmEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.CharmEfficacy).writeU8(value);
    }

    get deathblowEfficacy(): number {
        return this.add(Offsets.BattleCharacter.DeathblowEfficacy).readU8();
    }

    set deathblowEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.DeathblowEfficacy).writeU8(value);
    }

    get nightmareEfficacy(): number {
        return this.add(Offsets.BattleCharacter.NightmareEfficacy).readU8();
    }

    set nightmareEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.NightmareEfficacy).writeU8(value);
    }

    get delayEfficacy(): number {
        return this.add(Offsets.BattleCharacter.DelayEfficacy).readU8();
    }

    set delayEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.DelayEfficacy).writeU8(value);
    }

    get vanishEfficacy(): number {
        return this.add(Offsets.BattleCharacter.VanishEfficacy).readU8();
    }

    set vanishEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.VanishEfficacy).writeU8(value);
    }

    get statDownEfficacy(): number {
        return this.add(Offsets.BattleCharacter.StatDownEfficacy).readU8();
    }

    set statDownEfficacy(value: number) {
        this.add(Offsets.BattleCharacter.StatDownEfficacy).writeU8(value);
    }

    // get slashEfficacy(): number {
    //     return this.readU16(Offsets.BattleCharacter.SlashEfficacy);
    // }

    // set slashEfficacy(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.SlashEfficacy, value);
    // }

    // get thurstEfficacy(): number {
    //     return this.readU16(Offsets.BattleCharacter.ThrustEfficacy);
    // }

    // set thurstEfficacy(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.ThrustEfficacy, value);
    // }

    // get pierceEfficacy(): number {
    //     return this.readU16(Offsets.BattleCharacter.PierceEfficacy);
    // }

    // set pierceEfficacy(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.PierceEfficacy, value);
    // }

    // get strikeEfficacy(): number {
    //     return this.readU16(Offsets.BattleCharacter.StrikeEfficacy);
    // }

    // set strikeEfficacy(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.StrikeEfficacy, value);
    // }

    // get earthEfficacy(): number {
    //     return this.readU8(Offsets.BattleCharacter.EarthEfficacy);
    // }

    // set earthEfficacy(value: number) {
    //     this.writeU8(Offsets.BattleCharacter.EarthEfficacy, value);
    // }

    // get waterEfficacy(): number {
    //     return this.readU8(Offsets.BattleCharacter.WaterEfficacy);
    // }

    // set waterEfficacy(value: number) {
    //     this.writeU8(Offsets.BattleCharacter.WaterEfficacy, value);
    // }

    // get fireEfficacy(): number {
    //     return this.readU8(Offsets.BattleCharacter.FireEfficacy);
    // }

    // set fireEfficacy(value: number) {
    //     this.writeU8(Offsets.BattleCharacter.FireEfficacy, value);
    // }

    // get windEfficacy(): number {
    //     return this.readU8(Offsets.BattleCharacter.WindEfficacy);
    // }

    // set windEfficacy(value: number) {
    //     this.writeU8(Offsets.BattleCharacter.WindEfficacy, value);
    // }

    // get timeEfficacy(): number {
    //     return this.readU8(Offsets.BattleCharacter.TimeEfficacy);
    // }

    // set timeEfficacy(value: number) {
    //     this.writeU8(Offsets.BattleCharacter.TimeEfficacy, value);
    // }

    // get spaceEfficacy(): number {
    //     return this.readU8(Offsets.BattleCharacter.SpaceEfficacy);
    // }

    // set spaceEfficacy(value: number) {
    //     this.writeU8(Offsets.BattleCharacter.SpaceEfficacy, value);
    // }

    // get mirageEfficacy(): number {
    //     return this.readU8(Offsets.BattleCharacter.MirageEfficacy);
    // }

    // set mirageEfficacy(value: number) {
    //     this.writeU8(Offsets.BattleCharacter.MirageEfficacy, value);
    // }

    // get description(): string {
    //     return this.readPointer(Offsets.BattleCharacter.Description).readAnsiString()!;
    // }

    // set description(s: string) {
    //     this.readPointer(Offsets.BattleCharacter.Description).writeUtf8String(s);
    // }

    // // Check that this is writable to mid battle as there is another exp value.
    // get expValue(): number {
    //     return this.readU16(Offsets.BattleCharacter.EXPValue); // Check that this is U16 or U32
    // }

    // set expValue(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.EXPValue, value); // Check that this is U16 or U32
    // }

    // get earthSepith(): number {
    //     return this.readU16(Offsets.BattleCharacter.EarthSepith);
    // }

    // set earthSepith(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.EarthSepith, value);
    // }

    // get waterSepith(): number {
    //     return this.readU16(Offsets.BattleCharacter.WaterSepith);
    // }

    // set waterSepith(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.WaterSepith, value);
    // }

    // get fireSepith(): number {
    //     return this.readU16(Offsets.BattleCharacter.FireSepith);
    // }

    // set fireSepith(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.FireSepith, value);
    // }

    // get windSepith(): number {
    //     return this.readU16(Offsets.BattleCharacter.WindSepith);
    // }

    // set windSepith(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.WindSepith, value);
    // }

    // get timeSepith(): number {
    //     return this.readU16(Offsets.BattleCharacter.TimeSepith);
    // }

    // set timeSepith(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.TimeSepith, value);
    // }

    // get spaceSepith(): number {
    //     return this.readU16(Offsets.BattleCharacter.SpaceSepith);
    // }

    // set spaceSepith(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.SpaceSepith, value);
    // }

    // get mirageSepith(): number {
    //     return this.readU16(Offsets.BattleCharacter.MirageSepith);
    // }

    // set mirageSepith(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.MirageSepith, value);
    // }

    // get massSepith(): number {
    //     return this.readU16(Offsets.BattleCharacter.MassSepith);
    // }

    // set massSepith(value: number) {
    //     this.writeU16(Offsets.BattleCharacter.MassSepith, value);
    // }

    // // Values from t_mons.tbl, not used live in battle.
    // // Changing some of these changes an enemy after restarting fight, no real need for this so no setters.
    // get algoFileName(): string {
    //     return this.readPointer(Offsets.BattleCharacter.AlgoFileName).readAnsiString()!;
    // }

    // get modelName(): string {
    //     return this.readPointer(Offsets.BattleCharacter.ModelName).readAnsiString()!;
    // }

    // get aniName(): string {
    //     return this.readPointer(Offsets.BattleCharacter.AniName).readAnsiString()!;
    // }

    // get modelScale(): number {
    //     return this.readFloat(Offsets.BattleCharacter.ModelScale);
    // }

    // get cameraPivotHeight(): number {
    //     return this.readFloat(Offsets.BattleCharacter.CameraPivotHeight);
    // }

    // get float1(): number {
    //     return this.readFloat(Offsets.BattleCharacter.float1);
    // }

    // get float2(): number {
    //     return this.readFloat(Offsets.BattleCharacter.float2);
    // }

    // get float3(): number {
    //     return this.readFloat(Offsets.BattleCharacter.float3);
    // }

    // get float4(): number {
    //     return this.readFloat(Offsets.BattleCharacter.float4);
    // }

    // get float5(): number {
    //     return this.readFloat(Offsets.BattleCharacter.float5);
    // }

    // get short6(): number {
    //     return this.readU16(Offsets.BattleCharacter.short6);
    // }

    // get short7(): number {
    //     return this.readU16(Offsets.BattleCharacter.short7);
    // }

    // get HPBase(): number {
    //     return this.readU32(Offsets.BattleCharacter.HPBase);
    // }

    // get HPMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.HPMultiplier);
    // }

    // get EPBase(): number {
    //     return this.readU32(Offsets.BattleCharacter.EPMax);
    // }

    // get EPInit(): number {
    //     return this.readFloat(Offsets.BattleCharacter.EPInit);
    // }

    // get CPBase(): number {
    //     return this.readU32(Offsets.BattleCharacter.CPMax);
    // }

    // get CPInit(): number {
    //     return this.readFloat(Offsets.BattleCharacter.CPInit);
    // }

    // get STRBase(): number {
    //     return this.readU32(Offsets.BattleCharacter.STRBase);
    // }

    // get STRMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.STRMultiplier);
    // }

    // get DEFBase(): number {
    //     return this.readU32(Offsets.BattleCharacter.DEFBase);
    // }

    // get DEFMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.DEFMultiplier);
    // }

    // get ATSBase(): number {
    //     return this.readU32(Offsets.BattleCharacter.ATSBase);
    // }

    // get ATSMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.ATSMultiplier);
    // }

    // get ADFBase(): number {
    //     return this.readU32(Offsets.BattleCharacter.ADFBase);
    // }

    // get ADFMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.ADFMultiplier);
    // }

    // get DEXBase(): number {
    //     return this.readU32(Offsets.BattleCharacter.DEXBase);
    // }

    // get DEXMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.DEXMultiplier);
    // }

    // get AGLBase(): number {
    //     return this.readU16(Offsets.BattleCharacter.AGLBase);
    // }

    // get AGLMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.AGLMultiplier);
    // }

    // get EVABase(): number {
    //     return this.readU16(Offsets.BattleCharacter.EVABase)
    // }

    // get SPDBase(): number {
    //     return this.readU16(Offsets.BattleCharacter.SPDBase);
    // }

    // get SPDMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.SPDMultiplier);
    // }

    // get MOVBase(): number {
    //     return this.readU16(Offsets.BattleCharacter.MOVBase);
    // }

    // get MOVMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.MOVMultiplier);
    // }

    // get EXPBase(): number {
    //     return this.readU16(Offsets.BattleCharacter.EXPBase);
    // }

    // get EXPMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.EXPMultiplier);
    // }

    // get BreakBase(): number {
    //     return this.readU16(Offsets.BattleCharacter.BreakBase);
    // }

    // get BreakMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.BreakMultiplier);
    // }

    // get name(): string {
    //     return this.readPointer(Offsets.BattleCharacter.Name).readAnsiString()!;
    // }

    // get sepithEarth(): number {
    //     return this.readU8(Offsets.BattleCharacter.SepithEarth);
    // }

    // get sepithWater(): number {
    //     return this.readU8(Offsets.BattleCharacter.SepithWater);
    // }

    // get sepithFire(): number {
    //     return this.readU8(Offsets.BattleCharacter.SepithFire);
    // }

    // get sepithWind(): number {
    //     return this.readU8(Offsets.BattleCharacter.SepithWind);
    // }

    // get sepithTime(): number {
    //     return this.readU8(Offsets.BattleCharacter.SepithTime);
    // }

    // get sepithSpace(): number {
    //     return this.readU8(Offsets.BattleCharacter.SepithSpace);
    // }

    // get sepithMirage(): number {
    //     return this.readU8(Offsets.BattleCharacter.SepithMirage);
    // }

    // get sepithMass(): number {
    //     return this.readU8(Offsets.BattleCharacter.SepithMass);
    // }

    // get sepithWaterMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.SepithWaterMultiplier);
    // }

    // get sepithFireMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.SepithFireMultiplier);
    // }

    // get sepithWindMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.SepithWindMultiplier);
    // }

    // get sepithTimeMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.SepithTimeMultiplier);
    // }

    // get sepithSpaceMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.SepithSpaceMultiplier);
    // }

    // get sepithMirageMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.SepithMirageMultiplier);
    // }

    // get sepithMassMultiplier(): number {
    //     return this.readFloat(Offsets.BattleCharacter.SepithMassMultiplier);
    // }

    // get statVarMin(): number {
    //     return this.readFloat(Offsets.BattleCharacter.StatVarMin);
    // }

    // get statVarMax(): number {
    //     return this.readFloat(Offsets.BattleCharacter.StatVarMax);
    // }

    // // unknown if can change mid battle, needs testing.
    // get dropItemId1(): number {
    //     return this.readU16(Offsets.BattleCharacter.DropItemId1);
    // }

    // set dropItemId1(id: number) {
    //     this.writeU16(Offsets.BattleCharacter.DropItemId1, id);
    // }

    // get dropItemId2(): number {
    //     return this.readU16(Offsets.BattleCharacter.DropItemId2);
    // }

    // set dropItemId2(id: number) {
    //     this.writeU16(Offsets.BattleCharacter.DropItemId2, id);
    // }

}