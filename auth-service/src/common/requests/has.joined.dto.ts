import { ApiProperty } from '@nestjs/swagger';

export class HasJoinedRequest {
  @ApiProperty()
  username: string;
  @ApiProperty()
  serverId: string;
}
