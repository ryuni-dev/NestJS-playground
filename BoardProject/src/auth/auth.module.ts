import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/typeorm/typeorm-ex.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import * as config from 'config'
import { ConfigService } from '@nestjs/config';

const config = new ConfigService()

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.get('JWT_SECRET'),// 'Secret1234', //jwtConfig.secret || 
      signOptions:{
        expiresIn: config.get('JWT_EXPIRES_IN')//jwtConfig.expiresIn,
      }
    }),
    TypeOrmExModule.forCustomRepository([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
