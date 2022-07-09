import { JsonResponse } from '../utils/jsonresponse';
import { tagsList } from '../../database';

export async function tag(interaction) {
  const query = interaction.data.options?.find(o => o.name === 'tag')?.value;

  const choices = tagsList
    .filter(tag => tag.name?.includes(query) || tag.alias?.includes(query))
    .map(tag => ({ name: tag.name, value: tag.id }));

  return new JsonResponse({
    type: 8,
    data: { choices },
  });
}
