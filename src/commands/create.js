import { JsonResponse } from '../utils/jsonresponse';
import { tagsList, mods } from '../../database';

export async function create(interaction) {
  if (!mods.includes(interaction.member?.user.id || interaction.user?.id))
    return new JsonResponse({
      type: 4,
      data: {
        content: 'You do not have permissions to create tags',
        flags: 1 << 6,
      },
    });

  const name = interaction.data.options?.find(o => o.name === 'name')?.value;
  const alias = interaction.data.options?.find(o => o.name === 'alias')?.value;
  const data = interaction.data.options?.find(o => o.name === 'data')?.value;

  if (!name || !data)
    return new JsonResponse({
      type: 4,
      data: {
        content: 'Name and data are required to create tags',
        flags: 1 << 6,
      },
    });

  const tag = { id: Date.now(), name, data };
  if (alias) tag.alias = alias;

  tagsList.push(tag);

  return new JsonResponse({
    type: 4,
    data: {
      content: `Tag \`${name}\` was created`,
      flags: 1 << 6,
    },
  });
}
