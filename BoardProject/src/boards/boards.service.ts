import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
//import { Repository } from 'typeorm';
import { Board } from './board.entity'
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        //@Inject('BOARD_REPOSITORY')
        private boardRepository: BoardRepository,
        //Repository<Board>,
    ) {}

    async getAllBoards(
        user: User,
    ): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', {userID: user.uid})

        const boards = await query.getMany()
        return boards;
    }
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    async createBoard(
        createBoardDto: CreateBoardDto,
        user: User,
        ): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    // async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    //     const { title, description } = createBoardDto;
    //     const board = this.boardRepository.create({
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     })
        
    //     await this.boardRepository.save(board);
    //     return board;
    // }
    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id : uuid(),
    //         title,
    //         description,
    //         status : BoardStatus.PUBLIC
    //     };

    //     this.boards.push(board);
    //     return board;
    // }

    // async getBoardById(id: number): Promise<Board> {
    //     const found = await this.boardRepository.findOne(id);

    //     if(!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`)
    //     }

    //     return found;
    // }

    async getBoardById(
        id: number,
        user: User
        ): Promise<Board> {
        const found = await this.boardRepository.findOne({
            where: { id, uid: user.uid }
        })

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`)

        }
        return found;
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id == id);

    //     if(!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }

    //     return found;
    // }

    async deleteBoard(
        id: number,
        user: User
        ): Promise<void> {
        const result = await this.boardRepository.delete({id, uid: user.uid});

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }
    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id != found.id);
    // }

    async updateBoardStatus(
        id: number, 
        status: BoardStatus,
        user: User
        ): Promise<Board> {
        const board = await this.getBoardById(id, user);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
