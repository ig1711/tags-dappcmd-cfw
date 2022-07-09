import { JsonResponse } from '../utils/jsonresponse';
import { tagsList } from '../../database';

export async function tag(interaction) {
  const tagId = interaction.data.options?.find(o => o.name === 'tag')?.value;

  const tag = tagsList.find(t => t.id === tagId);

  if (!tag)
    return new JsonResponse({
      type: 4,
      data: {
        content:
          "Sorry, something went wrong, this shouldn't have happened ;-;",
        flags: 1 << 6,
      },
    });

  return new JsonResponse({
    type: 4,
    data: {
      content: tag.data || 'wtf, tag was found but no data available',
    },
  });
}
