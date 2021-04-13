import { Column, Entity, ObjectIdColumn } from 'typeorm';

export type NameDetails = {
    first: string;
    last: string;
}

@Entity('user')
export class User {
    @ObjectIdColumn({ type: 'string' })
    _id: string;

    @Column()
    name: NameDetails;

    @Column()
    email: string;

    @Column()
    password: string;
}