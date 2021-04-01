import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './Services/users.service';
import { ProductsModule } from '../Products/products.module';

@Module({
    modules: [ProductsModule],
    controllers: [UsersController],
    components: [UsersService]
})
export class UsersModule { }