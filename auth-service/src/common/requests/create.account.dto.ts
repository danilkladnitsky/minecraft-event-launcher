import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountRequest {
  @ApiProperty({ default: 'nickname' })
  nickname: string;
  @ApiProperty({ default: 'password' })
  password?: string;
}
