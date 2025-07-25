import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { MachinesModule } from './machines/machines.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'auth.db',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    MachinesModule,
  ],
})
export class AppModule {}
