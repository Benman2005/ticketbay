import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'
import Ticket from '../tickets/entities'

@Entity()
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column({nullable:true})
    eventname: string

    @Column()
    date: Date  

    @Column('char')
    userid: User["id"]

    @Column()
    description: string

    @Column()
    photo: string

}


