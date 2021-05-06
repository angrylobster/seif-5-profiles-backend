import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { HomeworkModule } from './homework/homework.module';
import { AttendanceModule } from './attendance/attendance.module';
@Module({
    imports: [
        AttendanceModule,
        AuthModule,
        ConfigModule.forRoot(), 
        HomeworkModule,
        UsersModule,
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: process.env.DB_URL,
            database: process.env.DB_NAME,
            synchronize: true,
            useUnifiedTopology: true,
            autoLoadEntities: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
