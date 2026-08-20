import * as utils from "../../utils";
import { Interceptor2 } from "../../utils";
import { API } from "../../modules";

const MODULE_SORA2 = Process.enumerateModules()[0]

function readPrintfArg(
    arg: NativePointer,
    length: string | undefined,
    specifier: string,
    precision: string | undefined,
): string {
    switch (specifier) {
        case 'd':
        case 'i': {
            if (length === 'll') {
                return new Int64(arg.toString()).toString();
            }
            // Win64: int and long are both 32-bit.
            return arg.toInt32().toString();
        }

        case 'u': {
            if (length === 'll') {
                return new UInt64(arg.toString()).toString();
            }
            // Win64: unsigned int and unsigned long are 32-bit.
            return arg.toUInt32().toString();
        }

        case 'x':
        case 'X': {
            let hex = arg.toString().replace(/^0x/, '');

            if (length !== 'll') {
                // %x/%lx are 32-bit on Win64.
                hex = hex.slice(-8);
            }
            return specifier === 'X'
                ? hex.toUpperCase()
                : hex;
        }

        case 'o': {
            let value: string;

            if (length === 'll') {
                value = new UInt64(arg.toString()).toString(8);
            } else {
                value = arg.toUInt32().toString(8);
            }
            return value;
        }

        case 'F':
        case 'f': {
            let value = utils.hexDoubletoDouble(arg.toString()!);
            if (precision !== undefined) {
                return value.toFixed(parseInt(precision))
            }
            return value.toString();
        }

        case 'p':
            return arg.toString();
        case 's':
            return arg.readUtf8String() ?? '<null>';
        case 'c':
            return String.fromCharCode(arg.toUInt32() & 0xff);
        default:
            return `<unsupported:${specifier}>`;
    }
}

function hookOutputPrintf() {
    const regex = /%([-+ #0]*)(\d+)?(\.(\d+))?([hlL]?)([diuoxXfFeEgGaAcspn%])/g;
    const regex2 = /%([-+ #0]*)(\d+)?(\.(\d+))?(ll|l|h|L)?([diuoxXfFeEgGaAcspn%])/g;
    const printfRegex = /%([-+ #0]*)(\d+)?(?:\.(\d+))?(hh|h|ll|l|j|z|t|L)?([diuoxXfFeEgGaAcspn%])/g;

    const basicReg = /%([dfsxXp%])/g;
    // Param1 = level, Param2 = devPath, Param3 = maxSize (int), Param4 = format ...args.
    // const output_printf_ptr = MODULE_SORA1.base.add(0x036cd0);
    const output_printf_ptr = MODULE_SORA2.base.add(0x57A4A0);


    Interceptor.attach(output_printf_ptr, {
        onEnter(args) {
            const format = args[3].readUtf8String()!.trim();

            // const matches = format.match(regex) || []; // Simple regex for types
            // matches.forEach((specifier, index) => {
            //     const val = args[index + 2]; // Offset by 2 because 0=dest, 1=format
            //     utils.log(`Arg ${index}: ${specifier} -> ${val}, format = ${format}`);
            // });

            let i = 4;
            let formatted = format.replace(regex, (match, flags, width, precisionFull, precision, length, specifier) => {
                if (specifier === '%') return '%';
                const arg = args[i++];

                switch (specifier) {
                    case 'd': return arg.toInt32()!.toString();
                    case 's': return arg.readUtf8String()!;
                    case 'x': return arg.toString()!.slice(2, 10);
                    case 'f':
                        let value = utils.hexDoubletoDouble(arg.toString()!);
                        if (precision !== undefined) {
                            return value.toFixed(parseInt(precision))
                        }
                        return value.toString();
                    default:
                        utils.log(`Unknown format: ${match}`);
                        return match;
                    }
            });
            if (args[1].readUtf8String()) {
                utils.log(`File: ${args[1].readUtf8String()}`)
            }
                
            utils.log(`${formatted}`);
        }
    });
}

function outputDebug() {
    Interceptor.attach(API.KERNEL32.OutputDebugStringA, {
        onEnter(args) {
            let str = args[0].readUtf8String()!;
            if (str != '\n') {
                utils.log(str)
            }
            // utils.log(args[0].readUtf8String()!);
        }
    });
}



function outputDebug2(){
    const printfRegex = /%([-+ #0]*)(\d+)?(?:\.(\d+))?(hh|h|ll|l|j|z|t|L)?([diuoxXfFeEgGaAcspn%])/g;
    const output_printf_ptr = MODULE_SORA2.base.add(0x57A4A0);

    let pathMemory = "";

    Interceptor.attach(output_printf_ptr, {
    onEnter(args) {
        const format = args[3].readUtf8String() ?? '';
        let argIndex = 4;

        const formatted = format.replace(
            printfRegex,
            (
                match,
                flags,
                width,
                precision,
                length,
                specifier
            ) => {
                if (specifier === '%') {
                    return '%';
                }

                const arg = args[argIndex++];

                return readPrintfArg(
                    arg,
                    length,
                    specifier,
                    precision
                );
            }
        );

        const file = args[1].readUtf8String()!;
        if (pathMemory != file) {
            utils.log(`[LOG File] ${file}`);
            pathMemory = file;
        }

        utils.log(`[LOG] ${formatted}`);
    }
});
}

function main() {
    utils.log(`[*] Kiseki-Frida sora_2nd.js attached.`);
    // hookOutputPrintf();
    // outputDebug();
    outputDebug2();

}

main();