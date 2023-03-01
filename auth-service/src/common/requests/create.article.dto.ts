import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleRequest {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  thumbnail: string;
}
