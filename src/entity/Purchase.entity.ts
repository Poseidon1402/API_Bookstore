import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book.entity";
import { User } from "./User.entity";

@Entity({name: "purchases"})
export class Purchase {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.code_user)
    author: User

    @ManyToOne(() => Book, (book) => book.book_number)
    book: Book
}