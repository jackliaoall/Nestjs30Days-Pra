import { WebSocketGateway, SubscribeMessage, WsResponse, WebSocketServer, WsException, NestGateway } from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import Socket = SocketIO.Socket;

//WebSocket listen  port 81，namespace:messages
@WebSocketGateway({ port: 81, namespace: 'messages' })
export class ChatGateway implements NestGateway {
    socket: Socket;
    constructor() { }

    afterInit(server) { }

    handleConnection(socket) { }

    handleDisconnect(socket) { }
    @SubscribeMessage({ value: 'pushMessage' })
    AddMessage(sender, message: string) {
        sender.emit('newMessage', message);
        sender.broadcast.emit('newMessage', message);
    }
}