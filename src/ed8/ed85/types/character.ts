import { Offsets } from "../addrs";

export class Character extends NativePointer {
    get name(): string {
        return this.add(Offsets.Character.Name).readUtf8String()!;
    }

    set name(str: string) {
        this.add(Offsets.Character.Name).writeUtf8String(str);
    }
}