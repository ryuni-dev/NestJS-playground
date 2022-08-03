import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
//import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmExModule } from 'src/typeorm/typeorm-ex.module';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    //DatabaseModule
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
