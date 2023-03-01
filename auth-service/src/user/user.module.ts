import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSession } from 'src/entities/auth_session.dto';
import { User } from 'src/entities/user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, AuthSession])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
