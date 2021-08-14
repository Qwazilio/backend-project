import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { LibraryService } from '../services/library.service';
import { Users } from '../entities/users.entity';
import { CreateUser, UpdateUser} from './users.dto';
import { Books } from '../entities/books.entity';

@Controller('rest/users')
export class UsersController {
    constructor(private readonly libraryService: LibraryService) {}
    
  @Get()
  allUsers() : Promise<Users[]> {  // Cписок пользователей
    return this.libraryService.findAllUser()
  }

  @Get(':id')
  async thisUser(@Param('id') id) {  // Получение конкретного пользователя по индификатору 
      const user = await this.libraryService.findUserById(id) 
      const book = new Books()
      book.owner = id
      const books = await this.libraryService.findUserBook(book)
      return Object.assign({},user,{books})
  }

  @Post()
  addUser(@Body() createUser: CreateUser){  // Добавление пользователя
    if(createUser.firstName == "" || createUser.lastName == ""){
      return "wrong data"
    }else{
      const users = new Users();
      users.firstName = createUser.firstName
      users.lastName = createUser.lastName
      return this.libraryService.createUser(users)
    }
  }

  @Post('/findUser')
  getUserByName(@Body() dataUser: Users): Promise<Users>{  // Поиск пользователя по имени
      const users = new Users();
      users.firstName = dataUser.firstName
      users.lastName = dataUser.lastName
      return this.libraryService.findOneUserName(users)
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() {firstName, lastName, subscription}: UpdateUser): Promise<Users>{  // Редактирование пользователя
    const user = await this.libraryService.findUserById(id)
    user.firstName = firstName
    user.lastName = lastName
    user.subscription = subscription
    return this.libraryService.updateUser(user)
  }

  @Put('/subscription/:id')
  async subscriptionUser(@Param('id') id: string, @Body() {subscription}: UpdateUser): Promise<Users>{  //Устновка наличия купленного абонимента
    const user = await this.libraryService.findUserById(id)
    user.subscription = subscription
    return this.libraryService.updateUser(user)
  }

  @Delete(':id')
  deleteUser(@Param('id')id : string): Promise<void>{ // Удаление пользователя
      return this.libraryService.removeUser(id)
      
  }

}
