import { Controller, Get, Post, Request, Response, Param, Next, HttpStatus, Body } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-users.dto';
import { UsersService } from './Services/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Get()
    async getAllUsers(@Request() req, @Response() res, @Next() next) {
        await this.userService.getAllUsers()
        .then((users) => {
            res.status(HttpStatus.OK).json(users)
        }).catch((error) => {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        })
    }

    @Get('/:id')
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

    @Post()
    async addUser(@Response() res, @Body() createUserDTO:CreateUserDTO) {
        await this.userService.addUser(createUserDTO).subscribe((users) => {
            res.status(HttpStatus.OK).json(users);
        })
    }
}