import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation';
import { Board } from './board.entity'
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';


@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController{
    private logger = new Logger('BoardController');
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoard(
        @GetUser() user: User,
    ): Promise<Board[]> {
        this.logger.verbose(`User "${user.username}" trying to get all boards.`);
        return this.boardsService.getAllBoards(user);
    }
    // @Get()
    // getAllTask(): Board[]{
    //     return this.boardsService.getAllBoards(); 
    // }

    @Get('/:id')
    getBoardById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
        ): Promise<Board> {
            this.logger.verbose(`User "${user.username}" trying to get board by id.`);
            return this.boardsService.getBoardById(id, user);
        }
    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User,
        ): Promise<Board> {
        this.logger.verbose(`User "${user.username}" trying to create a new board.`);
        return this.boardsService.createBoard(createBoardDto, user);
    }
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
        ): Promise<void> {
        this.logger.verbose(`User "${user.username}" trying to delete board by id.`);
        return this.boardsService.deleteBoard(id, user);
    }
    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
        @GetUser() user: User
    ): Promise<Board> {
        this.logger.verbose(`User "${user.username}" trying to update board by id.`);
        return this.boardsService.updateBoardStatus(id, status, user);
    }
    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // ): Board {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}