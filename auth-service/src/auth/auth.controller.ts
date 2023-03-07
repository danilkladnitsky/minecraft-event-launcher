import { ForbiddenException, Headers, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAccountRequest } from 'src/common/requests/create.account.dto';
import { HasJoinedRequest } from 'src/common/requests/has.joined.dto';
import { JoinRequest } from 'src/common/requests/join.dto';
import { LoginResultRequest } from 'src/common/requests/login.result.dto';
import { LoginUserRequest } from 'src/common/requests/login.user.dto';
import { UserId } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.dto';
import { AdminGuard } from 'src/guards/AdminGuard';
import { PlayerGuard } from 'src/guards/PlayerGuard';
import { AuthService } from './auth.service';

const jwt = require("jsonwebtoken");


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() data: LoginUserRequest): Promise<LoginResultRequest> {
    return await this.authService.loginUser(data);
  }

  @UseGuards(PlayerGuard)
  @Get("verify-token")
  async verifyToken(@UserId() userId: number): Promise<User> {
    return await this.authService.verifyToken(userId);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('account/:nickname')
  async createAccount(@Param("nickname") nickname: string) {
    return await this.authService.createAccount(nickname);
  }

  @UseGuards(PlayerGuard)
  @Post("access-token")
  async getAccessToken(@Headers("Authorization") token: string) {
    const payload = token.split("Bearer")[1].trim();
    if (!payload) {
      throw new ForbiddenException();
    }

    try {
      jwt.verify(payload, process.env.JWT_TOKEN);
    } catch (err) {
      throw new ForbiddenException();
    }


    return await this.authService.getAccessToken(payload);
  }

  @Post('join.php')
  async join(@Body() data: JoinRequest) {
    console.log("JOIN", data.selectedProfile, data);
    
    if (!data.accessToken || !data.selectedProfile) {
      throw new BadRequestException({
        error: 'Invalid user data. Something is missing',
      });
    }

    try {
      const result = await this.authService.join(data);
      
      throw new ForbiddenException();
      return result;
    } catch (err) {
      console.log(err);
      
    }

  }

  @Get('profile.php')
  async profile(@Query('uuid') uuid: string) {
    console.log("PROFILE", uuid);

    if (!uuid) {
      throw new BadRequestException({
        error: 'Invalid user data. UUID is missing',
      });
    }

    const result = await this.authService.getProfile(uuid);

    return result;
  }

  @Get("admin-token/:username/:password")
  async getAdminToken(@Param("username") username: string, @Param("password") password: string) {
    const result = await this.authService.getAdminToken(username, password);

    return result;
  }

  @Get('hasJoined.php')
  async hasJoined(@Query() data: HasJoinedRequest) {
    console.log("HAS JOINED", data.username, data);
    
    if (!data.username || !data.serverId) {
      throw new BadRequestException({
        error: 'Invalid user data. Something is missing',
      });
    }

    try {
      const result = await this.authService.hasJoined(data);
      console.log(result);
      
      return result;
    } catch (err) {
      console.log(err);
      
    }
  }
}
