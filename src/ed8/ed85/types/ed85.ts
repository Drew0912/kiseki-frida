import { Addrs, Offsets } from "../addrs";
import { ScriptManager } from "./scriptManager";
import { BattleProc } from "./battleProc";

export class ED85 extends NativePointer {
    private static _sharedInstance: ED85;
    // private static _config: IConfig;

    private static _SBreak = new NativeFunction(Addrs.ED85.PlayerSBreak, 'uint16', ['pointer', 'pointer', 'bool', 'uint32', 'uint16']);

    // static _displayText = new NativeFunction(ptr(0x1403691F0), 'void', ['pointer', 'pointer', 'float', 'float', 'pointer', 'pointer', 'pointer', 'float', 'float', 'float', 'pointer', 'float', 'int', 'bool', 'bool', 'float', 'pointer', 'pointer', 'pointer', 'pointer', 'float', 'float', 'float', 'pointer', 'float', 'int']);

    // static displayText(string: NativePointer, x: number = 0.0, y: number = 0.0, r: number = 1.0, g: number = 1.0, b: number = 1.0, textBrightness: number = 1.0, textSize: number = 36.0, textWidth: number = 1.0, newLineSize: number = 0.0) {
    //     let ar = new ArrayBuffer(16)
    //     let floatBufferRGB = new Float32Array(ar, 0, 3)

    //     floatBufferRGB[0] = r;
    //     floatBufferRGB[1] = g;
    //     floatBufferRGB[2] = b;

    //     let ar2 = new ArrayBuffer(16)
    //     let floatBuffer2 = new Float32Array(ar2, 0, 3)
    //     floatBuffer2[0] = 0.0;
    //     floatBuffer2[1] = 0.0;
    //     floatBuffer2[2] = 0.0;

    //     this._displayText(ED85.sharedInstance.pointer, ptr(0), x, y, string, ar.unwrap(), ptr(0), textBrightness, textSize, textWidth, ar2.unwrap(), newLineSize, 0, 0, 0, 0, ptr(0), ptr(0), ptr(0), ptr(0), 0, 0, 0, ptr(0), 1.0, 3)
    // }

    static get sharedInstance(): ED85 {
        if (this._sharedInstance)
            return this._sharedInstance;

        const p = Addrs.ED85.SharedInstance.readPointer();

        if (p.isNull()) {
            throw new Error('ED85 null');
        }

        this._sharedInstance = new ED85(p);
        return this._sharedInstance;
    }

    static get scriptManager(): ScriptManager {
        return new ScriptManager(this.sharedInstance.add(Offsets.ED85.ScriptManager).readPointer());
    }

    // static getConfig(): IConfig {
    //     const defaultConfig: IConfig = {
    //         isFileRedirection : false,
    //         patchDirs : ['data/'],
    //         isSetPatchDirs : false,
    //         isOpenCommandPrompt: false,
    //         isLoadDebug : true,
    //         isHookActMenu : [false, 'FC_ActMenu_MOD'],
    //         isOutputDebugInfo : 0,
    //         isChangeTitleVerString : [true, 'ED8Frida - No config file found', true],
    //         isAddToWindowText : true,
    //         isOpcodeTracing : false,
    //         isDisableAbnormalStatusLimitWithBossFlag: false,
    //         isAbnormalStatusLimitWithBossFlagSub1: false,
    //         patchInsightEVA : [false, 50],
    //         patchInsightACC : [false, 50],
    //         patchBlindEVA : [false, 50],
    //         patchBlindACC : [false, 50],
    //         limitEVA : [false, 75],
    //         isBODurationDownOnEnemyTurn : false,
    //     }

    //     if (this._config)
    //         return this._config;

    //     this._config = function() {
    //         const exePath = path.join(path.dirname(path.dirname(path.dirname(Modules.ED85.path.split('\\').join('/')))), 'bin', 'Win64', 'ED8Frida', 'config_ED8Frida.json5');
    //         // utils.log('config file location: %s', exePath);
    //         const config = utils.readFileContent(exePath);
    //         if (!config)
    //             return defaultConfig;

    //         const s = Buffer.from(config).toString('utf8');

    //         try {
    //             const cfg: IConfig = json5.parse(s);
    //             return cfg;
    //         } catch (e) {
    //             utils.log('load config: %s', e);
    //         }

    //         return defaultConfig;
    //     }();

    //     return this._config;
    // }

    static get battleProc(): BattleProc {
        return ScriptManager.battleProc;
    }
    
    static SBreak(pseudoChrId: number) {
        const battleCharWork = function() {
            if (pseudoChrId >= 0xF043 && pseudoChrId <= 0xF04A) {
                const res = BattleProc.getBattleCharWorkForEnemyNumber(pseudoChrId);
                return res;
            }
            // This does not work for player pseudoChrId as it does not automatically use S-Craft.
            // else if (pseudoChrId >= 0xF020 && pseudoChrId <= 0xF027) {
            //     // const res = BattleProc.getBattleCharWorkForEnemyNumber(pseudoChrId);
            //     // return res;
            // }
        }();

        if (battleCharWork) {
            ED85._SBreak(ED85.battleProc.battleATManager.pointer, battleCharWork, 1, 0, 0);
        }
    }
}