import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    book_number: number;

    @Column({type: 'varchar', length: 30, nullable: false})
    title: string;

    @Column({type: "varchar", length: 255, nullable: false})
    description: string;

    @Column({type: "varchar", length: 25, nullable: false})
    category: string;

    @Column({type: "number"})
    price: number;
    
    @Column({type: "varchar", length: 15, nullable: false})
    page_number: string;

    @Column({type: "varchar", length: 15, nullable: false})
    language: string;
}
