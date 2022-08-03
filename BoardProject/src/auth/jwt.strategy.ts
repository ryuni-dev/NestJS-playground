import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserRepository } from "./user.repository";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: config.get('jwt.secret'),
            jwtFromRequest: ExtractJwt.fromAuthoHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOneBy({
            username: username
        });

        if (!user) {
            throw new UnauthorizedException();
        }
    }
}