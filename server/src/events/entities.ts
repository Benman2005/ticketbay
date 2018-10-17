import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, } from 'typeorm'
import User from '../users/entity'
// import Ticket from '../tickets/entities'


@Entity()
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column({nullable:true})
    eventname: string

    @Column()
    date: Date  

    @Column('char', {length: 100})
    readonly userid?: User["id"]

    @Column()
    description: string

    @Column({nullable:true})
    photo?: string

    // @OneToMany(type => Ticket, ticket =>ticket.eventid)
    // tickets: Ticket[]

}


