import { verify } from './utils/verify';
import { handlers } from './handlers';
import { JsonResponse } from './utils/jsonresponse';

async function fetch(request, env) {
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('X-Signature-Timestamp');
  if (!signature || !timestamp) return new Response('', { status: 401 });

  const body = await request.text();
  
  const isValidRequest = await verify(body, signature, timestamp, env.PUBLIC_KEY); // todo: handle rejection
  if (!isValidRequest) return new Response('', { status: 401 });

  const interaction = JSON.parse(body);

  const handle = handlers[interaction.type];
  if (!handle)
    return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });

  return await handle(interaction);
}

export default { fetch };
