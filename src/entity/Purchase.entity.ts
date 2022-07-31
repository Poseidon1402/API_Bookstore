import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book.entity";
import { User } from "./User.entity";

@Entity({name: "purchases"})
export class Purchase {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "boolean", default: false})
    payed: boolean

    @ManyToOne(() => User, (user) => user.code_user)
    user: User

    @ManyToOne(() => Book, (book) => book.book_number)
    book: Book
}