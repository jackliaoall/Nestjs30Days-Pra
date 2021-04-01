import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Transport, Client, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs/Observable';

@Controller()
export class AppController {
  @Client({ transport: Transport.TCP})
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
}