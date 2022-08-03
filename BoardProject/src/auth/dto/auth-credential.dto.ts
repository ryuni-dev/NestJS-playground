import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /^[a-zA-Z0-9]*$/,
        { message: 'Only alphabets and numbers allowed.'})
    password: string;
}