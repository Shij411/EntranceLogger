import {IPlugin, IModLoaderAPI} from 'modloader64_api/IModLoaderAPI';
import { bus, EventHandler, EventsClient } from 'modloader64_api/EventHandler';
import { Init, onCreateResources, onTick, onViUpdate, Postinit, Preinit } from "modloader64_api/PluginLifecycle";
import {IOOTCore, OotEvents} from 'modloader64_api/OOT/OOTAPI';
import {InjectCore} from 'modloader64_api/CoreInjection';
import { IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';

class entrancelogger implements IPlugin{

    ModLoader!: IModLoaderAPI;
    pluginName?: string | undefined;
    @InjectCore()
    core!: IOOTCore;
    entranceNumber: number = -1;
    entrance: number = this.emulator.rdramReadPtr16(global.ModLoader.global_context_pointer, 0x11E1A);

    preinit(): void {
    }
    init(): void {
    }
    postinit(): void {
    }
    onTick(frame?: number | undefined): void {
        if (this.core.helper.isLinkEnteringLoadingZone() && this.entranceNumber != this.core.global.lastOrCurrentEntrance){
            this.ModLoader.logger.info('moving to: ' + this.core.global.lastOrCurrentEntrance + '.');
            this.ModLoader.logger.info('moving to: ' + this.entrance + '.');
            this.entranceNumber = this.core.global.lastOrCurrentEntrance;
        }
    }

}

module.exports = entrancelogger;