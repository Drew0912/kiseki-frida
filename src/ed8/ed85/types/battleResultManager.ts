import { NativePointerObject } from "../../../utils";

export class BattleResultManager extends NativePointerObject {
    // This value is used for action count in RP condition fights,
    // (Expr.Eval, 'BattleCmd(0x5C, 0x00)') gets this number
    get turnsPassedInBattle(): number {
        return this.pointer.add(0x39C).readU32();
    }

    set turnsPassedInBattle(value: number) {
        this.pointer.add(0x39C).writeU32(value);
    }

}