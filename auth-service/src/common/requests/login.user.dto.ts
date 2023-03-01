import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  password: string;
}
