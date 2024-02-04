import { IsDefined, IsString } from 'class-validator';

export class AuthorizeAccountDto {
  @IsDefined()
  @IsString()
  jwtToken!: string;
}
