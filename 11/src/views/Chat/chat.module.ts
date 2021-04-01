import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';

@Module({
    controllers: [ChatController],
    components: [ChatGateway]
})
export class ChatModule { }