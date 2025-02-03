import { MessagePayload } from './types';

export function shouldBroadcastMessage(payload: MessagePayload): boolean {
  return payload.priority === 'high';
}
