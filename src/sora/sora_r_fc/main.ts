import * as utils from "../../utils";
import { Interceptor2 } from "../../utils";
import { API } from "../../modules";

const MODULE_SORA1 = Process.enumerateModules()[0]

// V1.06.3

// 0x140036cd0
function hookOutputPrintf() {
    const regex = /%([-+ #0]*)(\d+)?(\.(\d+))?([hlL]?)([diuoxXfFeEgGaAcspn%])/g;
    const regex2 = /%([-+ #0]*)(\d+)?(\.(\d+))?(ll|l|h|L)?([diuoxXfFeEgGaAcspn%])/g;

    const basicReg = /%([dfsxXp%])/g;
    // Param1 = level, Param2 = format, Param3... = ...args.
    // const output_printf_ptr = MODULE_SORA1.base.add(0x036cd0);
    const output_printf_ptr = MODULE_SORA1.base.add(0x460330);
    Interceptor.attach(output_printf_ptr, {
        onEnter(args) {
            const format = args[3].readUtf8String()!.trim();

            // const matches = format.match(regex) || []; // Simple regex for types
            // matches.forEach((specifier, index) => {
            //     const val = args[index + 2]; // Offset by 2 because 0=dest, 1=format
            //     utils.log(`Arg ${index}: ${specifier} -> ${val}, format = ${format}`);
            // });

            let i = 4;
            let formatted = format.replace(regex2, (match, flags, width, precisionFull, precision, length, specifier) => {
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
            utils.log(args[0].readUtf8String()!);
        }
    });
}

function main() {
    // utils.log(`[*] Kiseki-Frida sora_1st.js attached.`);
    hookOutputPrintf();
    // outputDebug();

}

main();