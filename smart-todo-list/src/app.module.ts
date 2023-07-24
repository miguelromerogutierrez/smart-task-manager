import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { DBModule } from './repositories/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Section } from './section.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DBModule, TypeOrmModule.forFeature([Todo, Section])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
