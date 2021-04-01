import { WebSocketGateway, SubscribeMessage, WsResponse, WebSocketServer, WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

@WebSocketGateway(81)
export class ChatGateway {
    @WebSocketServer() server;

    @SubscribeMessage('wannaChat')
    onEvent(client, message): WsResponse<string> {
        const event = 'wannaChat';
        console.log(message);
        const response = `Hi,I'm Chat Server.`;
        return { event, data: response };
    }
}