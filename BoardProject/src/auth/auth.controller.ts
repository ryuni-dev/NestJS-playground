import { Body, Controller, Get, Logger, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    private logger = new Logger('AuthController');
    constructor (private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void>{
        this.logger.verbose(`New user "${authCredentialsDto.username}" trying to sign up.`);
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<string> {
        this.logger.verbose(`User "${authCredentialsDto.username}" trying to sign in.`);
        return this.authService.signIn(authCredentialsDto)
    }

}
