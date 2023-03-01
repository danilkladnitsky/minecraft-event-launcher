import { ApiProperty } from '@nestjs/swagger';

export class JoinRequest {
  @ApiProperty()
  selectedProfile: string;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  serverId: string;
}
