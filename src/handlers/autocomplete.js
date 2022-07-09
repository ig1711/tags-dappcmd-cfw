import * as autocompletes from '../autocompletes';
import { JsonResponse } from '../utils/jsonresponse';

export default async function (interaction) {
  const autocomplete = autocompletes[interaction.data.name];
  if (!autocomplete)
    return new JsonResponse({ error: 'Unknown Command' }, { status: 400 });
  return await autocomplete(interaction);
}
