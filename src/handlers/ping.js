import { JsonResponse } from '../utils/jsonresponse';

export default function () {
  return new JsonResponse({ type: 1 });
}
