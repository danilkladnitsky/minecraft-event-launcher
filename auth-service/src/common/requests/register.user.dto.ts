import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequest {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  password: string;
}
