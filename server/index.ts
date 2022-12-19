import * as alt from 'alt-server';
import { PluginSystem } from '@AthenaServer/systems/plugins';
import { Shapeshifter } from './src/system';

const PLUGIN_NAME = 'Athena Shapeshifter';

PluginSystem.registerPlugin(PLUGIN_NAME, async () => {
    Shapeshifter.init();
    alt.log(`~lg~${PLUGIN_NAME} was Loaded`);
});
