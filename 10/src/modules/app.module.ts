import { Module, RequestMethod, UseFilters } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { LoggerMiddleware } from './Shared/Middlewares/logger.middleware';
import { NestModule, MiddlewaresConsumer } from '@nestjs/common/interfaces';
import { UsersController } from './Users/users.controller';
import { ProductsController } from './Products/products.controller';
import { SimpleMiddleware } from './Shared/Middlewares/simple.middleware';
import { HttpExceptionFilter } from './Shared/ExceptionFilters/http-exception.filter';

@Module({
  modules: [UsersModule]
})
// @UseFilters(new HttpExceptionFilter())
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void  {
    consumer.apply([LoggerMiddleware, SimpleMiddleware])
    .with('來自根模組的參數')
    .forRoutes(
      UsersController,
      ProductsController
    )
  }
}
