import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { PostModule } from 'src/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UsersModule,
    PostModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV ? `.env.${ENV}.local` : '.env',
    }),
    // initialize TypeOrmModule asynchronously to use ConfigService for database configuration
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_TYPE') as any,
        host: configService.get<string>('DATABASE_HOST'),
        autoLoadEntities: true,
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: true,
      }),
    }),

    // initialize JwtModule asynchronously to use ConfigService for JWT configuration
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(
            configService.get<string>('JWT_EXPIRES_IN') || '3600',
          ), // Set token expiration time
          issuer: configService.get<string>('JWT_ISSUER'),
          audience: configService.get<string>('JWT_AUDIENCE'),
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
