import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { User } from "./entities/user.dto";
import { AuthSession } from "./entities/auth_session.dto";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "postgres",
          host: config.get("PG_HOST"),
          port: +config.get("PG_PORT"),
          username: config.get("PG_USER"),
          password: config.get("PG_PASSWORD"),
          database: config.get("PG_DB"),
          entities: [User, AuthSession],
          synchronize: true
        };
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
