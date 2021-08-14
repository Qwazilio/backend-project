import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, ObjectID, Repository } from 'typeorm';
import { Books } from '../entities/books.entity';
import { Users } from '../entities/users.entity';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  findAllUser(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  createUser(user : Users): Promise<Users>{
    return this.usersRepository.save(user)
  }

  updateUser(user : Users): Promise<Users>{
    return this.usersRepository.save(user)
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  findOneBook(id: string): Promise<Books> {
    return this.booksRepository.findOne(id);
  }

  findOneUserName(user: Users): Promise<Users> {
    return this.usersRepository.findOne(user);
  }

  findUserById(id: string): Promise<Users> {
    return this.usersRepository.findOne(id);
  }

  rentBook(book: Books): Promise<Books> {
    return this.booksRepository.save(book)
  }

  createBook(book : Books): Promise<Books>{
    return this.booksRepository.save(book)
  }

  returnBook(book : Books): Promise<Books>{
    return this.booksRepository.save(book)
  }

  async _rentBook(idUser: string): Promise<Users>{ 
    const user = await this.findUserById(idUser)
    user.books++
    return this.usersRepository.save(user)
  }
  async _returnBook(idUser: string): Promise<Users>{
    const user = await this.findUserById(idUser)
    user.books--
    return this.usersRepository.save(user)
  }
  
  findUserBook(idUser: Books): Promise<Books[]>{
    return this.booksRepository.find(idUser)
  }
}