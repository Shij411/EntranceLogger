import {IPlugin, IModLoaderAPI} from 'modloader64_api/IModLoaderAPI';
import { bus, EventHandler, EventsClient } from 'modloader64_api/EventHandler';
import { Init, onCreateResources, onTick, onViUpdate, Postinit, Preinit } from "modloader64_api/PluginLifecycle";
import {IOOTCore, OotEvents} from 'modloader64_api/OOT/OOTAPI';
import {InjectCore} from 'modloader64_api/CoreInjection';

class entrancelogger implements IPlugin{

    ModLoader!: IModLoaderAPI;
    pluginName?: string | undefined;
    @InjectCore()
    core!: IOOTCore;

    preinit(): void {
    }
    init(): void {
    }
    postinit(): void {
    }
    onTick(frame?: number | undefined): void {
    }

    @EventHandler(OotEvents.ON_LOADING_ZONE)
    onLoadingZone(evt: any) {
        // 0x11a5d0 = going into loadingzone, in ram as 32 bit location
        // 0x11f248 = global_context_pointer, in ram as 16 bit pointer
        // 0x11E1A = last known loadingzone, given as offset
        this.ModLoader.logger.info('moving from: ' + this.ModLoader.emulator.rdramRead32(0x11a5d0) + ' to: ' + this.ModLoader.emulator.rdramReadPtr16(0x11f248, 0x11E1A) + '.');
    }


}

module.exports = entrancelogger;