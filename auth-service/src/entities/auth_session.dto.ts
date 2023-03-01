import { AuthStatus } from 'src/common/enum/auth.status.enum';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base_entity.dto';

@Entity()
export class AuthSession extends BaseEntity {
  @Column()
  nickname: string;

  @Column()
  status: AuthStatus;
}
