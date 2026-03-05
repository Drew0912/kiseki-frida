import { Addrs } from "../addrs";
import { Interceptor2 } from "../../../utils";
import * as utils from "../../../utils";

enum LoggerLevel {
    NoInfo = 0,
    Printf = 1,
    Logger2 = 2, // less info, more accurate
}

let loggerLevel = LoggerLevel.Printf;
export function setLoggerLevel(value: number) {
    loggerLevel = value;
}

// More accurate logger but gives less information.
function Logger2() {
    // Not needed?
    // Interceptor2.jmp(
    //     Addrs.Logger.Ansi2UTF8,
    //     function(output: NativePointer, outputSize: NativePointer, input: NativePointer) {
    //         if (loggerLevel == LoggerLevel.Logger2) {
    //             const s = input.readAnsiString()!;
    //             output.writeUtf8String(s.slice(0, outputSize.toUInt32()));
    //         }
    //     },
    //     'void', ['pointer', 'pointer', 'pointer'],
    // );

    // Addrs.Logger.OutputDebugStringA is never used.
    const Logger_Output = Interceptor2.jmp(
        Addrs.Logger.OutputDebugStringW,
        function(self: NativePointer, level: NativePointer, buffer: NativePointer) {
            if (loggerLevel == LoggerLevel.Logger2) {
                const buf = buffer.readUtf8String()!;
                if (buf.substring(buf.length - 1) == '\n') {
                    utils.log(buf.substring(0, buf.length - 1));
                } else {
                    utils.log(buf);
                }
            }
            Logger_Output(self, level, buffer);
        },
        'void', ['pointer', 'pointer', 'pointer'],
    );
}

function hookLoggerPrintf() {
    const regex = /%([-+ #0]*)(\d+)?(\.(\d+))?([hlL]?)([diuoxXfFeEgGaAcspn%])/g;
    const basicReg = /%([dfsxXp%])/g;
    // Param1 = level, Param2 = format, Param3... = ...args.
    Interceptor.attach(Addrs.Logger.Output_Printf, {
        onEnter(args) {
            const format = args[1].readUtf8String()!.trim();

            // const matches = format.match(regex) || []; // Simple regex for types
            // matches.forEach((specifier, index) => {
            //     const val = args[index + 2]; // Offset by 2 because 0=dest, 1=format
            //     utils.log(`Arg ${index}: ${specifier} -> ${val}, format = ${format}`);
            // });

            let i = 2;
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
            utils.log(`${formatted}`);
        },
    });
}

export function outputDebugInfo(level: number) {
    loggerLevel = level;
    // Do hooks
    hookLoggerPrintf()
    Logger2()
}
