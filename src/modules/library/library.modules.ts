import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Books } from './entities/books.entity';
import { UsersController } from './controllers/users.controller';
import { BooksController } from './controllers/books.controller';
import { LibraryService } from './services/library.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Books])],
  controllers: [UsersController, BooksController],
  providers: [LibraryService],
})
export class LibraryModule {}