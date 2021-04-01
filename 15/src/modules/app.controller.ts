import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Transport, Client, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/Observable';
import { RabbitMQClient } from './Shared/Services/rabbitmq.client';

@Controller()
export class AppController {
  client: ClientProxy;

  @MessagePattern({ cmd: 'sayHi' })
  sayHi(data: string): Observable<string> {
    return Observable.of("Hi,I'm MicroService.");
  }
  
  @Get()
  call(): Observable<string> {
    const pattern = { cmd: 'sayHi' };
    const data = '';
    return this.client.send<string>(pattern, data);
  }

  @MessagePattern({ cmd: 'amqp' })
  useRabbitMQ(data: string): Observable<string> {
    return Observable.of(data);
  }

  @Get('/rabbitMQ')
  callRabbitMQ(): Observable<string> {
    const pattern = { cmd: 'amqp' };
    const data = 'use RabbitMQ';
    this.client = new RabbitMQClient('amqp://rmtahlzz:Jqyq1OnzF7qWPzQXmcwAQly_aRsTrd1z@mustang.rmq.cloudamqp.com/rmtahlzz', 'example');
    return this.client.send<string>(pattern, data);
  }
}