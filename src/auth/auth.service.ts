import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { compare, hash } from 'bcryptjs';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './types/auth-payload';
import { verify } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
      private readonly entityManager: EntityManager,
      private jwtService: JwtService,
    ) {}

    async createUser(createUserInput: CreateUserInput) {
      const userExists = await this.usersRepository.findOne({
        where: { username: createUserInput.username}
      })
      if (userExists) {
        throw new NotFoundException('Username exists');
      }
        createUserInput.password = await hash(createUserInput.password, 10)
        const user = new User(createUserInput)
        return await this.entityManager.save(user)
      }
    
  async loginUser(loginInput: CreateUserInput) {
    const user = await this.usersRepository.findOne({
      where: { username: loginInput.username}
    })
    if (!user) {
      throw new NotFoundException('Username not found');
    }
    const isPasswordMatch = await compare(loginInput.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }

  async generateToken(id: number) {
    const payload: AuthJwtPayload = {
      sub: {
        id
      }
    }
    const accessToken = await  this.jwtService.signAsync(payload);

    return { accessToken }
  }

  async login(user: User): Promise<AuthPayload> {
    const { accessToken } = await this.generateToken(user.id)

    return {
      id: user.id,
      accessToken,
    }
  }


  async validateUser(id: number) {
    const user = this.usersRepository.findOne({
      where: { id }
    })
    const jwtUser: { id: number} = {
      id: (await user).id
    }

    return jwtUser;
  }
        
      // }
  // create(createAuthInput: CreateAuthInput) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthInput: UpdateAuthInput) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
