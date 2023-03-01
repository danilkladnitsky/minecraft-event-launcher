import { ApiProperty } from '@nestjs/swagger';

export class TokenVerifyRequest {
  @ApiProperty()
  token: string;
}
