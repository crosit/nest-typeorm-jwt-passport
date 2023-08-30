import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: { name: string; password: string }) {
    return this.authService.signUp(
      createUserDto.name,
      createUserDto.password,
    );
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      credentials.email,
      credentials.password,
    );
      
    if (!user) {
      throw new UnauthorizedException('Invalid credentials', 'Invalid credentials');
    }

    const token = await this.authService.generateToken({ id: user.id });
    return { token };
  }
}
