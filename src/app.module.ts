import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibraryModule } from './modules/library/library.modules';

@Module({
  imports: [TypeOrmModule.forRoot(), LibraryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
