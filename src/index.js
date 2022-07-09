import { verify } from './utils/verify';
import { handlers } from './handlers';
import { JsonResponse } from './utils/jsonresponse';

async function fetch(request, env) {
  const signature = request.headers.get('x-signature-ed25519');
  if (!signature) return new Response('', { status: 401 });

  const isValidRequest = await verify(request, env); // todo: handle rejection
  if (!isValidRequest) return new Response('', { status: 401 });

  const interaction = await request.json(); // todo: ^

  const handle = handlers[interaction.type];
  if (!handle)
    return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });

  return await handle(interaction);
}

export default { fetch };
