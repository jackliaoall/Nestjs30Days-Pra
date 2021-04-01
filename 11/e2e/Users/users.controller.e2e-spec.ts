import * as express from 'express';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../../src/modules/Users/users.module';
import { UsersService } from '../../src/modules/Users/Services/users.service';

describe('Users', () => {
    const server = express();
    const usersService = {
        getAllUsers: () => [
            { "_id": 1, "_name": "Michael", "_age": 25 },
            { "_id": 2, "_name": "Mary", "_age": 27 }
        ]
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            modules: [UsersModule]
        })
            .overrideComponent(usersService).useValue(usersService)
            .compile()

        const app = module.createNestApplication(server);
        await app.init();
    });

    it('/GET users',()=>{
        return request(server)
        .get('/users')
        .expect(200)
        .expect(usersService.getAllUsers())
    })
});