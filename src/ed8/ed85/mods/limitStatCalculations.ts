import { Addrs } from "../addrs";

// Hooks into function that adds EVA (on taking a hit) to char EVA if they have insight
export function limitEVA(value: number) {
    // Before checks for EVA added for Insight. Maybe use X86Writer instead?
    // ptr(0x14012EC9B) (v1.1.5)
    Interceptor.attach(Addrs.AbnormalStatus.LimitEVAInstruction, function() {
        const ctx = (this.context as X64CpuContext);
        if (ctx.rdi.toUInt32() > value) {
            // utils.log(`EVA Value before: ${ctx.rdi.toUInt32().toString()}`);
            ctx.rdi = ptr(value);
            // utils.log(`EVA Value after: ${ctx.rdi.toUInt32().toString()}`);
        }
    });
}