import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({name: "users"})
export class User {

    @PrimaryColumn({type: 'varchar', length: 100, nullable: false})
    code_user: string;

    @Column({type: 'varchar', length: 25, nullable: false})
    firstName: string;

    @Column({type: 'varchar', length: 30, nullable: false})
    lastName: string;

    @Column({type: 'varchar', length: 40, nullable: false})
    email: string;

    @Column({type: 'date', nullable: false})
    birthDate: Date;

    @Column({type: 'enum', enum: ['CLIENT', 'AUTHOR']})
    role: "CLIENT" | "AUTHOR";

    @Column({type: 'varchar', length: 150, nullable: false})
    password: string
}