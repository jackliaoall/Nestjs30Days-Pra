import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
    intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
        console.log('在執行方法之前...');
        const now = Date.now();
        return stream$.do(() => { console.log(`在執行方法之後...${Date.now() - now}ms`) })
    }
}