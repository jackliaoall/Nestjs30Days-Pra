import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { Observable } from 'rxjs/Observable';
import { CreateProductDTO } from '../DTO/create-products.dto';

@Component()
export class ProductsService {
    private products = [
        { "_id": 1, "_name": "Watch", "_price": 1000 },
        { "_id": 2, "_name": "Phone", "_price": 25000 }
    ];

    getAllProducts() {
        return Promise.resolve(this.products);
    }

    getProduct(id: number) {
        const product = this.products.find((product) => {
            return product._id === id;
        });
        if (!product) {
            throw new HttpException("product not found", 404);
        }
        return Promise.resolve(product);
    }
    
    addProduct(product: CreateProductDTO): Observable<object[]> {
        this.products.push(product);
        return Observable.of(this.products);
    }
}