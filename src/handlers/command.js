import * as commands from '../commands';
import { JsonResponse } from '../utils/jsonresponse';

export default async function (interaction) {
  const command = commands[interaction.data.name];
  if (!command)
    return new JsonResponse({ error: 'Unknown Command' }, { status: 400 });
  return await command(interaction);
}
