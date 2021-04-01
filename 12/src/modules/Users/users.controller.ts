import { Controller, Get, Post, Request, Response, Param, Next, HttpStatus, Body, HttpException, UseFilters, UseInterceptors  } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-users.dto';
import { UsersService } from './Services/users.service';
import { ProductsService } from '../Products/Services/products.service';
import { CustomForbiddenException } from '../Shared/ExceptionFilters/forbidden.exception';
import { HttpExceptionFilter } from '../Shared/ExceptionFilters/http-exception.filter';
import { ValidationPipe } from '../Shared/Pipes/validation.pipe';
import { ParseIntPipe } from '../Shared/Pipes/parse-int.pipe';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../Shared/Guards/roles.guard';
import { Roles } from '../Shared/Decorators/roles.decorator';
import { LoggingInterceptor } from '../Shared/Interceptors/logging.interceptor';
import { TransformInterceptor } from '../Shared/Interceptors/transform.interceptor';
import { ExceptionInterceptor } from '../Shared/Interceptors/exception.interceptor';

@Controller()
// @UseGuards(RolesGuard)
// @UseFilters(new HttpExceptionFilter())
export class UsersController {

    constructor(private userService: UsersService,
                private productsService: ProductsService
        ) { }

    @Get('users')
    @Roles('admin')
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
    @Roles('general')
    async getUser(@Response() res, @Param('id', new ParseIntPipe()) id) {
        await this.userService.getUser(id)
            .then((user) => {
                res.status(HttpStatus.OK).json(user);
            })
            .catch((error) => {
                console.error(error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            })
    }

    @Post('users')
    async addUser( @Response() res, @Body(new ValidationPipe()) createUserDTO: CreateUserDTO) {
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

    @Get('getException')
    @UseFilters(new HttpExceptionFilter())
    async getException(@Request() req, @Response() res, @Next() next){
        throw new CustomForbiddenException();
    }

    @Get('testExceptionInterceptor')
    @UseInterceptors(ExceptionInterceptor)
    @UseFilters(new HttpExceptionFilter())
    async testExceptionInterceptor(@Request() req, @Response() res, @Next() next ) {
        throw new Error('test ExceptionInterceptor');
    }
}