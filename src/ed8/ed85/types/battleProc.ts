import { NativePointerObject } from "../../../utils";
import { Offsets } from "../addrs";
import { ED85 } from "./ed85";
import { BattleCharacter } from "./battleCharacter";
import { BattleATManager } from "./battleATManager";
import { BattleResultManager } from "./battleResultManager";

export class BattleProc extends NativePointerObject {
    get allBattleCharWork(): NativePointer {
        return this.pointer.add(Offsets.BattleProc.allBattleCharWork).readPointer();
    } 

    // Mostly same as above but no pointers for enemy BattleCharacter.
    get onlyPlayerBattleCharWork(): NativePointer {
        return this.pointer.add(Offsets.BattleProc.onlyPlayerBattleCharWork).readPointer();
    }

    // -1 should only be possible if no party members which should not be possible. Does not handle this case.
    static get numOfPartyMembers(): number {
        let numOfPartyMembers = -1;
        // Getting BattleCharacter index of last present party member plus 1 (zero index).
        for (let i = 1; i <= 8; i++) {
            // 0x100 contains all BattleCharWork, 0x110 contains only player BattleCharWork
            const BattleCharWork100 = ED85.battleProc.allBattleCharWork.add(i*8).readPointer();
            const BattleCharWork110 = ED85.battleProc.onlyPlayerBattleCharWork.add(i*8).readPointer();
            if (!BattleCharWork100.equals(BattleCharWork110)) {
                numOfPartyMembers = i;
                break;
            }
        }
        // utils.log("getBattleCharWorkForEnemyNumber: Should be number of party members: %s", numOfPlayerChar);
        return numOfPartyMembers;
    }

    static getBattleCharWorkForEnemyNumber(pseudoChrId: number): BattleCharacter | undefined {
        const foundBattleChar = new BattleCharacter(ED85.battleProc.allBattleCharWork.add((BattleProc.numOfPartyMembers + pseudoChrId - 0xF043) * 8).readPointer());
        // Checks if the found BattleCharacter actually is a BattleCharacter struct. Should only fail if pseudoChrId is not valid for the fight.
        if (foundBattleChar.isValid()) {
            return foundBattleChar;
        }
        return undefined;
    }

    static getBattleCharWorkForPartyNumber(partyNum: number): BattleCharacter | undefined {
        const foundBattleChar = new BattleCharacter(ED85.battleProc.onlyPlayerBattleCharWork.add((partyNum) * 8).readPointer());
        // Checks if the found BattleCharacter actually is a BattleCharacter struct. Should only fail if pseudoChrId is not valid for the fight.
        if (foundBattleChar.isValid()) {
            return foundBattleChar;
        }
        return undefined;
    }

    static forEachPartyMember(callback: (battleChar: BattleCharacter, index: number) => void) {
        for (let i = 0; i < this.numOfPartyMembers; i++) {
            const battleChar = this.getBattleCharWorkForPartyNumber(i);
            if (battleChar)
                callback(battleChar, i);
        }
    }

    // ED85.battleProc.SBreakParam1.add(0x358) (braveOrderDurationDownOnEnemyTurn)
    // Offsets == 0x8188
    get battleATManager(): BattleATManager {
        return new BattleATManager(this.pointer.add(Offsets.BattleProc.BattleATManager).readPointer());
    }

    get BattleResultManager(): BattleResultManager {
        return new BattleResultManager(this.pointer.add(Offsets.BattleProc.BattleResultManager).readPointer());
    }

    get braveOrderDurationCount(): number {
        return this.pointer.add(0x8268).readPointer().add(0x44).readU8();
    }

    set braveOrderDurationCount(value: number) {
        this.pointer.add(0x8268).readPointer().add(0x44).writeU8(value);
    }

    get braveOrderDurationCountDisplayOnly(): number {
        return this.pointer.add(0x8268).readPointer().add(0x45).readU8();
    }

    set braveOrderDurationCountDisplayOnly(value: number) {
        this.pointer.add(0x8268).readPointer().add(0x45).writeU8(value);
    }

    // Not tested
    get battleScriptName(): string {
        return this.pointer.add(Offsets.BattleProc.BattleScriptName).readPointer().readAnsiString()!;
    }
}