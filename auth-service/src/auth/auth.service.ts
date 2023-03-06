const bcrypt = require("bcryptjs");
var generator = require("generate-password");

import { v4 as uuid4 } from "uuid";

const jwt = require("jsonwebtoken");

import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { AuthStatus } from "src/common/enum/auth.status.enum";
import { CreateAccountRequest } from "src/common/requests/create.account.dto";
import { HasJoinedRequest } from "src/common/requests/has.joined.dto";
import { JoinRequest } from "src/common/requests/join.dto";
import { LoginUserRequest } from "src/common/requests/login.user.dto";
import { AuthSession } from "src/entities/auth_session.dto";
import { User } from "src/entities/user.dto";
import { Repository } from "typeorm";
import { TextureTypes } from "src/common/enum/textures.enum";
import { PATH_TO_TEXTURES } from "src/const";
import { LoginResultRequest } from "src/common/requests/login.result.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthSession)
    private readonly authRepository: Repository<AuthSession>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAccessToken(payload: string, key: string) {
    const { id } = jwt.verify(payload, process.env.JWT_TOKEN);
    const user = await this.userRepository.findOneOrFail(
      id,
      { select: ["accessToken", "nickname", "uuid", "secretKey"] }
    );

    const accessToken = uuid4();
    await this.userRepository.update(id, { accessToken });

    user.accessToken = accessToken;

    return user;
  }

  async verifyToken(userId: number) {
    return await this.userRepository.findOneOrFail(userId);
  }

  async loginUser({
    nickname,
    password
  }: LoginUserRequest): Promise<LoginResultRequest> {
    let loginStatus: AuthStatus;

    const user = await this.userRepository.findOne(
      { nickname },
      { select: ["password", "id", "nickname", "skinUrl"] }
    );

    if (!user) {
      throw new NotFoundException({ msg: "Такого пользователя нет" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException({ msg: "Неправильный никнейм / пароль" });
    }

    loginStatus = AuthStatus.SUCCESSFUL;

    await this.authRepository.update(user.id, {
      status: loginStatus
    });

    await this.userRepository.update(user.id, { accessToken: uuid4() });

    const token = jwt.sign(
      { id: user.id, skinUrl: user.skinUrl, role: "player" },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    return { nickname: user.nickname, token, id: user.id };
  }

  async createAccount({
    nickname,
    password
  }: CreateAccountRequest) {
    const useOwnPassword = !password;
    const existingUser = await this.userRepository.findOne({ nickname });

    if (existingUser) {
      throw new BadRequestException({ msg: "Этот пользователь уже создан" });
    }

    const salt = bcrypt.genSaltSync(10);

    const randomPassword = generator.generate({ length: 15, numbers: true });

    const newPassword = bcrypt.hashSync(
      useOwnPassword ? randomPassword : password,
      salt
    );

    const user = await this.userRepository.save({
      nickname,
      password: newPassword,
      uuid: uuid4().replace(/-/g, "")
    });

    return { nickname, password: useOwnPassword ? randomPassword : password, id: user.id };
  }

  async join(data: JoinRequest) {
    const uuid = data.selectedProfile;
    const accessToken = data.accessToken;

    try {
      const user = await this.userRepository.findOneOrFail({
        where: { uuid, accessToken }
      });

      await this.userRepository.update(user.id, { serverId: data.serverId });

      return { uuid, nickname: user.nickname } as User;
    } catch (err) {
      throw new NotFoundException({
        errorMessage:
          "Ошибка авторизации. Возможно вам стоит перезайти в игру через лаунчер",
        error: "Auth",
        cause: ""
      });
    }
  }

  async hasJoined({ username, serverId }: HasJoinedRequest) {
    try {
      const user = await this.userRepository.findOne({ nickname: username });

      if (!user || user.serverId !== serverId) {
        console.log(`${username} Bad server Id`);
        throw new NotFoundException({
          errorMessage:
            "Ошибка авторизации. Похоже, вы используете не официальный лаунчер Мегабаттла.",
          error: "Auth",
          cause: ""
        });
      }

      await this.userRepository.update(user.id, { serverId });

      console.log(`${username} подключился`, new Date());

      return this.getProfile(user.uuid);
    } catch (err) {
      console.log(`${username} не смог подключиться`, new Date());
      console.log(err);
      return;
    }
  }

  async getProfile(uuid: string) {
    const user = (await this.userRepository.findOne({
      uuid
    })) as User;
    const DOMAIN_URL = process.env.DOMAIN;
    const skinUrl = DOMAIN_URL + user.skinUrl;
    const capeUrl = user.capeUrl;

    const textures = { SKIN: { url: skinUrl }, CAPE: { url: capeUrl } };

    const res = {
      id: user.uuid,
      name: user.nickname,
      properties: [
        {
          name: "textures",
          value: btoa(
            JSON.stringify({
              timestamp: +new Date(),
              profileId: user.uuid,
              profileName: user.nickname,
              textures
            })
          ),
          signature: ""
        }
      ]
    };

    return res;
  }

  async getSkinURL(nickname: string, textureType: TextureTypes) {
    const path = `${PATH_TO_TEXTURES}${textureType.toLowerCase()}/${nickname}.png`;

    return path;
  }
}
