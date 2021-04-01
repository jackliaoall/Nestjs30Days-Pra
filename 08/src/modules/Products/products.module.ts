import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './Services/products.service';

@Module({
    controllers: [ProductsController],
    components: [ProductsService],
    exports: [ProductsService]
})
export class ProductsModule { }