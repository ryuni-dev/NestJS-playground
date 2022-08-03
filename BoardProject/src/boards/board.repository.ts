// import { DataSource, Repository } from "typeorm";
// import { Board } from "./board.entity";
// import { BoardStatus } from "./board-status.enum";
// import { CreateBoardDto } from "./dto/create-board.dto";


// export const BoardRepository = [
//     {
//         provide: 'BOARD_REPOSITORY',
//         useFactory: (dataSoruce: DataSource) => dataSoruce.getRepository(Board).extend({
//             async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
//                 const { title, description } = createBoardDto;
        
//                 const board = this.create({
//                     title,
//                     description,
//                     status: BoardStatus.PUBLIC
//                 })
        
//                 await this.save(board);
//                 return board;
//             }
//         }),
//         inject: ['DATA_SOURCE'],     
//     },
// ];

// // export const CustomRepository = {
// //     async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
// //         const { title, description } = createBoardDto;
// //         const board = this.create({
// //             title,
// //             description,
// //             status: BoardStatus.PUBLIC
// //         })
        
// //         await this.save(board);
// //         return board;
// //     }
// // }

// export class CustomRepository extends Repository<Board> {
//     async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
//         const { title, description } = createBoardDto;

//         const board = this.create({
//             title,
//             description,
//             status: BoardStatus.PUBLIC
//         })

//         await this.save(board);
//         return board;
//     }
// }

//import { User } from "src/auth/user.entity";
import { User } from "src/auth/user.entity";
import { CustomRepository } from "src/typeorm/typeorm-ex.decorator";
import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

    async createBoard(
        createBoardDto: CreateBoardDto,
        user: User
        ): Promise<Board> {
        const {title, description} = createBoardDto;

        const board = new Board();
        board.title = title;
        board.description = description;
        board.status = BoardStatus.PUBLIC;
        board.user = user;

        await board.save();

        delete board.user;
        
        return board;
    }
}