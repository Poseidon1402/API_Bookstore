import { 
    IsDate, 
    IsEmail, 
    IsIn, 
    IsNotEmpty, 
    Length, 
    MaxLength, 
    MinLength 
} from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({name: "users"})
export class User {

    @PrimaryColumn({type: 'varchar', length: 30, nullable: false})
    code_user: string;

    @Column({type: 'varchar', length: 25, nullable: false})
    @IsNotEmpty()
    @MinLength(5, {
        message: 'The length should be more or equal to 5, actual $value'
    })
    @MaxLength(25, {
        message: 'The length should be less or equal to 25, actual $value'
    })
    firstName: string;

    @Column({type: 'varchar', length: 30, nullable: false})
    @IsNotEmpty()
    @MinLength(5, {
        message: 'The length should be more or equal to 5, actual $value'
    })
    @MaxLength(25, {
        message: 'The length should be less or equal to 25, actual $value'
    })
    lastName: string;

    @Column({type: 'varchar', length: 40, nullable: false, unique: true})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column({type: 'date', nullable: false})
    @IsNotEmpty()
    @IsDate()
    birthDate: Date;

    @Column({type: 'enum', enum: ['CLIENT', 'AUTHOR']})
    @IsIn(['CLIENT', 'AUTHOR'])
    @IsNotEmpty()
    role: "CLIENT" | "AUTHOR";

    @Column({type: 'varchar', length: 150, nullable: false})
    @Length(8, 25)
    @IsNotEmpty() 
    @MinLength(5, {
        message: 'The length should be more or equal to 8, actual $value'
    })
    @MaxLength(25, {
        message: 'The length should be less or equal to 25, actual $value'
    })
    password: string
}