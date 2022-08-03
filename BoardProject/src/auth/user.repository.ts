import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CustomRepository } from "src/typeorm/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs'

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User();
        user.username = username;
        user.password = hashedPassword;

        try {
            await user.save()
        }
        catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}