import { ApiProperty } from '@nestjs/swagger';

export class LoginResultRequest {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  token: string;
  @ApiProperty()
  id: number;
}
