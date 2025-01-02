import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from "argon2"
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly db: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    let hashedPassword = await argon2.hash(createUserDto.password)
    const user = await this.db.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword
      },
    })
    delete user.password
    return user;
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
