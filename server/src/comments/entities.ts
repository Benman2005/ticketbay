import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'
import Ticket from '../tickets/entities'

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    blah: string

    @Column('char', {length: 100})
    userid: User["id"]

    @Column('char', {length: 100})
    ticketid: Ticket["id"]

}

