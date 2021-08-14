import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { Books } from '../entities/books.entity';
import { LibraryService } from '../services/library.service';
import { CreateBook, RentBook} from './books.dto';

@Controller('rest/books')
export class BooksController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  addBook(@Body() createBook: CreateBook){  //Добавление книги
    if(createBook.nameBook == null){
      return "Enter name book"
    }else{
      const book = new Books();
      book.nameBook = createBook.nameBook
      return this.libraryService.createBook(book)
    }
  }

  @Put(":id")
  async rentBook(@Param('id') id: string, @Body() {owner}: RentBook){  //Аренда книги c условием ее наличия в библиотеке и максимального лимита пользователя
      const user = await this.libraryService.findUserById(owner.toString())
      const book = await this.libraryService.findOneBook(id)
      if (book.availability == true && user.books < 5 && user.subscription == true){
        book.availability = false
        book.owner = owner
        this.libraryService._rentBook(owner.toString())
        return this.libraryService.rentBook(book)
      }else{
        return "Rent book not available"
      }      
  }
  
  @Put("returnBook/:id")
  async returnBook(@Param('id') id: string) {  //Возвращение книги
    const book = await this.libraryService.findOneBook(id)
    if(book.availability == false){
      book.availability = true
      this.libraryService._returnBook(book.owner.toString())
      book.owner = null
      return this.libraryService.returnBook(book)
    }else{
      return "You don't have a book"
    }

  }
}
