import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/users.entities';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async signUp(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    return this.userRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email:email } });
    if (!user) {
      return null;
    }
    return compare(password,user.password).then((res) => {
      if (!res) {
        return null;
      }
      return user;
    });
  }
}
