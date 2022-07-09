import ping from './ping';
import command from './command';
import autocomplete from './autocomplete';

export const handlers = [null, ping, command, null, autocomplete];
// ------------------------------------------ ^ components
// see https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type
