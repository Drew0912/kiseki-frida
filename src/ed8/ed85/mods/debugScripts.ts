import { Addrs } from "../addrs";
import { Interceptor2 } from "../../../utils";
import { ScriptManager } from "../types/scriptManager";
import { ScriptId } from "../types/consts";
import { API } from "../../../modules";

export function hookDebug() {
    const ScriptManager_LoadLibrary = Interceptor2.jmp(
            Addrs.ScriptManager.LoadLibraries,
            function(self: NativePointer): number {
                const ret = ScriptManager_LoadLibrary(self);
    
                if (ret == 0) {
                    ScriptManager.initDebug();
                    ScriptManager.initCustom();
                }
    
                return ret;
            },
            'uint32', ['pointer'],
        );
    
        const ScriptManager_GetScriptById = Interceptor2.jmp(
            Addrs.ScriptManager.GetScriptByID,
            function(pointer: NativePointer, context: NativePointer, id: number): NativePointer {
                switch (id) {
                    case ScriptId.Debug:
                        return ScriptManager.debug;
                }
    
                return ScriptManager_GetScriptById(pointer, context, id);
            },
            'pointer', ['pointer', 'pointer', 'uint16'],
        );
    
        const handleActMenu = Interceptor2.jmp(
            Addrs.ED85.HandleActMenu,
            function(arg1: NativePointer, arg2: number): number {
                const VK_SHIFT = 0x10;
                // const VK_CONTROL = 0x11;
    
                if (API.USER32.GetAsyncKeyState(VK_SHIFT) < 0) {
                    ScriptManager.getScriptByID(ScriptId.Debug)?.call(ScriptManager.getThreadContext(), 'FC_ActMenu_MOD', 0, 1);
                    return 0;
                }
    
                return handleActMenu(arg1, arg2);
            },
            'uint8', ['pointer', 'double'],
        );
} 