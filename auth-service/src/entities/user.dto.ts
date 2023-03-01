import { AccountStatus } from 'src/common/enum/account.status.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base_entity.dto';

@Entity()
export class User extends BaseEntity {
  @Column()
  nickname: string;

  @Column({select: false})
  password: string;

  @Column()
  uuid: string;

  @PrimaryGeneratedColumn('uuid')
  @Column({select: false})
  accessToken: string;

  @Column({ nullable: true })
  serverId: string;

  @Column({
    nullable: true,
  })
  skinUrl: string;

  @Column({
    nullable: true,
  })
  capeUrl: string;

  @Column({ default: AccountStatus.ENABLED })
  status: AccountStatus;

  @Column({ default: 'PLAYER' })
  type: 'PLAYER' | 'ADMIN';

  @Column({nullable: true, select: false})
  secretKey: string;

  
}
