import { Controller, Get, HttpCode } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Book } from './book.entity';

@Controller('books')
export class BookController {


    public constructor(private dataSource: DataSource){}

    @Get()
    @HttpCode(200)
    public retrieveAllBooks(): Promise<Book[]>{
        
        return this.dataSource.manager.find(Book);
    }
}
