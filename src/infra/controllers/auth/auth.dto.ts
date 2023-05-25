import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthSignUpDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class AuthSignInDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  // @Matches(
  //   '^(?=.*[a-zA-Z0-9])[a-zA-Z0-9._%+-]{6,}@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
  // )
  readonly emailOrUsername: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
