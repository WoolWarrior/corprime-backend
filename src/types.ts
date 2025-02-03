export interface MessagePayload {
  priority: Priority;
  content: string;
}

export type Priority = 'high' | 'medium' | 'low';
