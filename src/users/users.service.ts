import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  // constructor(
  //   @InjectRepository(User)
  //   private usersRepository: Repository<User>,
  //   private readonly entityManager: EntityManager,
  //   private jwtService: JwtService,
  // ) {}
  // async create(createUserInput: CreateUserInput) {
  //   createUserInput.password = await hash(createUserInput.password, 10)
  //   const user = new User(createUserInput)
  //   return await this.entityManager.save(user)
  // }

  // async loginUser(createUserInput: CreateUserInput) {
  //   const user = await this.usersRepository.findOne({
  //     where: {username: createUserInput.username}
  //   })
  //   if (!user) {
  //     return null
  //   }
  //   const passwordHasMatch = await compare(createUserInput.password, user.password);
  //   if (!passwordHasMatch) {
  //     return null;
  //   }
  //   const payload = { id: user.id, username: user.username };
  //   return {
  //     token: this.jwtService.sign(payload),
  //     user,
  //   };
    
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // async findOne(id: number) {
  //   return await this.usersRepository.findOne({
  //     where: {id}
  //   });
  // }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
