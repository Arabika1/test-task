import {
  IsString,
  IsEmail,
  Matches,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/)
  phoneNumber!: string;

  @IsEmail()
  email!: string;
}
