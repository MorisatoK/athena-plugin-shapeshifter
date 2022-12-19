import * as alt from 'alt-server';
import { PERMISSIONS } from '@AthenaShared/flags/permissionFlags';
import { Athena } from '@AthenaServer/api/athena';
import { Appearance } from '@AthenaShared/interfaces/appearance';
import { ClothingComponent } from '@AthenaShared/interfaces/clothing';
import { Item } from '@AthenaShared/interfaces/item';

class InternalFunctions {
    static init() {
        Athena.controllers.chat.addCommand(
            'shapeshift',
            '/shapeshift [model]',
            PERMISSIONS.ADMIN,
            InternalFunctions.applyShape,
        );
        Athena.controllers.chat.addCommand(
            'stopshapeshift',
            '/stopshapeshift',
            PERMISSIONS.ADMIN,
            InternalFunctions.resetShape,
        );
    }

    static applyShape(player: alt.Player, model: string) {
        Athena.player.emit.message(player, `Trying to apply ped model "${model}".`);
        player.model = alt.hash(model);
        alt.on('playerDeath', InternalFunctions.handleDeath);
    }

    static resetShape(player: alt.Player) {
        Athena.player.sync.appearance(player, player.data.appearance as Appearance);
        Athena.player.sync.equipment(player, player.data.equipment as Item<ClothingComponent>[]);
        alt.off('playerDeath', InternalFunctions.handleDeath);
    }

    // Some animal models are very finicky and ragdoll/die all over the place, even with god mode enabled.
    // In this case we reset the model
    static handleDeath(player: alt.Player) {
        if (!player.invincible) {
            return;
        }

        player.model = player.model;
    }
}

export class Shapeshifter {
    static init() {
        InternalFunctions.init();
    }
}
