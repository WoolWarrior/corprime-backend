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
import { shouldBroadcastMessage } from '../utils'; // Import the utility function

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
    this.logger.log(`Received message from ${client.id}: Priority ${payload.priority}, Content: ${payload.content}`);
    const timestamp = new Date().toISOString();
    let broadcastMsg = `${client.id} says: Priority ${payload.priority}, Content: ${payload.content} at ${timestamp}`;

    // Apply the filtering function
    if (shouldBroadcastMessage(payload)) {
      this.server.emit('message', broadcastMsg);
    } else {
      this.logger.log(`Message with priority ${payload.priority} is not broadcasted.`);
    }
  }
}
