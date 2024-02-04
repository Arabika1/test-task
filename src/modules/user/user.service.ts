import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/core/database/models/user/entity';
import { PinoLogger } from 'nestjs-pino';
import { CreateUserDto } from './dto/add-user.dto';
import { FindOptions } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: PinoLogger,
    @InjectModel(User)
    private userModel: typeof User,
  ) {
    this.logger.setContext(UserService.name);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOneBy(where: FindOptions<User>): Promise<User> {
    return this.userModel.findOne(where);
  }

  async addUser(data: CreateUserDto): Promise<User> {
    const { email, name, phoneNumber } = data;

    const user = await this.findOneBy({ where: { email } });
    if (user) {
      throw new HttpException(
        { message: 'User with this email already exists' },
        HttpStatus.FORBIDDEN,
      );
    }

    return this.userModel.create({
      email,
      name,
      phoneNumber,
    });
  }
}
