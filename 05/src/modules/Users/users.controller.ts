import { Controller, Get, Post, Request, Response, Param, Next, HttpStatus, Body } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-users.dto';
import { UsersService } from './Services/users.service';
import { ProductsService } from '../Products/Services/products.service';

@Controller()
export class UsersController {

    constructor(private userService: UsersService,
                private productsService: ProductsService
        ) { }

    @Get('users')
    async getAllUsers(@Request() req, @Response() res, @Next() next) {
        await this.userService.getAllUsers()
        .then((users) => {
            res.status(HttpStatus.OK).json(users)
        }).catch((error) => {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }

    @Get('users/:id')
    async getUser(@Response() res, @Param('id') id) {
        await this.userService.getUser(+id)
            .then((user) => {
                res.status(HttpStatus.OK).json(user);
            })
            .catch((error) => {
                console.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }

    @Post('users')
    async addUser(@Response() res, @Body() createUserDTO:CreateUserDTO) {
        await this.userService.addUser(createUserDTO).subscribe((users) => {
            res.status(HttpStatus.OK).json(users);
        })
    }

    @Get('testProducts')
    async testGetAllProducts( @Request() req, @Response() res, @Next() next) {
        await this.productsService.getAllProducts()
            .then((products) => {
                res.status(HttpStatus.OK).json(products);
            })
            .catch((error) => {
                console.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }
}