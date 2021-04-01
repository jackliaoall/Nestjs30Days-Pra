import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CreateUserDTO } from '../DTO/create-users.dto';

@Component()
export class UsersService {
    private users = [
        { "_id": 1, "_name": "Michael", "_age": 25 },
        { "_id": 2, "_name": "Mary", "_age": 27 }
    ];

    getAllUsers() {
        return Promise.resolve(this.users);
    }

    getUser(id: number) {
        const user = this.users.find((user) => {
            return user._id === id;
        });

        if (!user) {
            throw new HttpException("user not found", 404);
        }
        return Promise.resolve(user);
    }

    addUser(user: CreateUserDTO): Observable<object[]> {
        this.users.push(user);
        return Observable.of(this.users);
    }
}