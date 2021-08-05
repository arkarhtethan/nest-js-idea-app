import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaEntity } from './ideas/idea.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'root',
        database: 'ideas',
        synchronize: true,
        logging: true,
        entities: [IdeaEntity],
      }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
