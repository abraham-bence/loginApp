import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginData: LoginDto) {
    try {
      return this.authService.login(loginData)
    } catch {
      throw new UnauthorizedException("Hibás email vagy jelszó!")
    }
  }
}
