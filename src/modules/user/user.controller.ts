import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/add-user.dto';
import { User } from 'src/core/database/models/user/entity';
import { AuthDisable } from '../auth/auth.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  private async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('get-user/:id')
  private async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findOneBy({ where: { id } });
  }

  @AuthDisable()
  @Post('add-user')
  private async addUser(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.addUser(data);
  }
}
