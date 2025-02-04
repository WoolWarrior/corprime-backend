import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessagePayload } from '../types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealTimeDataGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(RealTimeDataGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: MessagePayload): void {
    this.logger.log(
      `Received ${payload.public ? 'public' : 'private'} message from ${client.id}: Content: ${payload.content}`,
    );
    const timestamp = new Date().toISOString();
    let messageResponse = {
      ...payload,
      timestamp,
      id: crypto.randomUUID(),
      client: client.id,
    };

    // Apply the filtering function
    if (messageResponse.public) {
      this.server.emit('message', messageResponse);
    } else {
      this.logger.log(`Non-public message is not broadcasted.`);
    }
  }
}
