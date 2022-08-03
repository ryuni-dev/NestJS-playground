import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
//import { DatabaseModule } from './database/database.module';
import { typeORMConfig } from './database/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    //DatabaseModule,
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
