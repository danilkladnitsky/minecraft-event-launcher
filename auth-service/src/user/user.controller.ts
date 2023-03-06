import { BadRequestException, Delete, Get, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { diskStorage } from 'multer';

const sizeOf = require('image-size');

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { User } from 'src/entities/user.dto';
import { UserService } from './user.service';
import { AdminGuard } from 'src/guards/AdminGuard';
import { PlayerGuard } from 'src/guards/PlayerGuard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AdminGuard)
  @ApiBearerAuth('JWT-auth')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth('JWT-auth')
  async getUser(@Param('id') id: number) {
    return await this.userService.getUser(id);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth('JWT-auth')
  async updateUser(
    @Param('id') id: number,
    @Body() data: Partial<User>,
  ) {
    return await this.userService.updateUser(id, data);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth('JWT-auth')
  async deleteUser(
    @Param('id') id: number,
  ) {
    return await this.userService.deleteUser(id);
  }

  @Post('upload/skin')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nickname: { type: 'string' },
        skin: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('skin', {
      storage: diskStorage({
        destination: './static/skin',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          cb(null, `${randomName}.png`);
        },
      }),
    }),
  )
  @UseGuards(PlayerGuard)
  async uploadSkin(@UploadedFile() skin, @Body('nickname') nickname) {
    const type = 'SKIN';

    if (!skin) {
      throw new BadRequestException();
    }

    if (skin.mimetype !== 'image/png') {
      throw new BadRequestException({
        msg: 'Файл должен быть с разрешением .png',
      });
    }

    const { height, width } = sizeOf(skin.path);

    this.validateSkin(height, width);

    await this.userService.linkUserTexture(nickname, skin.path, type);

    return {
      nickname,
      type,
      path: skin.path,
    };
  }

  @Post('upload/cape')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nickname: { type: 'string' },
        cape: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('cape', {
      storage: diskStorage({
        destination: './static/cape',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          cb(null, `${randomName}.png`);
        },
      }),
    }),
  )
   @UseGuards(PlayerGuard)
  async uploadCape(@UploadedFile() cape, @Body('nickname') nickname) {
    const type = 'CAPE';

    if (!cape) {
      throw new BadRequestException();
    }

    if (cape.mimetype !== 'image/png') {
      throw new BadRequestException({
        msg: 'Файл должен быть с разрешением .png',
      });
    }

    const { height, width } = sizeOf(cape.path);

    this.validateCape(height, width);

    await this.userService.linkUserTexture(nickname, cape.path, type);

    return await this.userService.linkUserTexture(
      nickname,
      cape.filename,
      type,
    );
  }

  validateSkin(height, width) {
    if (height !== width) {
      throw new BadRequestException({
        msg: 'Минимальный размер скина - 64 пикселя по высоте и по ширине',
      });
    }

    if (height > 2048 || width > 2048) {
      throw new BadRequestException({
        msg: 'Максимальный размер скина - 2048 пикселя по высоте и по ширине',
      });
    }

    if (height % 64 !== 0 || width % 64 !== 0) {
      throw new BadRequestException({
        msg: 'Размеры скины должны быть кратны 64',
      });
    }

    return true;
  }

  validateCape(height, width) {
    if (height > 1024 || width > 2048) {
      throw new BadRequestException({
        msg: 'Максимальный размер плаща - 2048 пикселя по высоте и по ширине',
      });
    }

    if (height % 32 !== 0 || width % 64 !== 0) {
      throw new BadRequestException({
        msg: 'Размеры скины должны быть кратны 64 по ширине и 32 по высоте',
      });
    }

    return true;
  }
}
