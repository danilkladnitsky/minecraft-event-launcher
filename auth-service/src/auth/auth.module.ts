import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSession } from 'src/entities/auth_session.dto';
import { User } from 'src/entities/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, AuthSession])],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
