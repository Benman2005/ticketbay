import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

@Entity()
export default class Ticket extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    eventid: number
    
    @Column()
    price: number

    @Column()
    description: string
    
    @Column('char')
    userid: User["id"]
    
    @Column()
    photo: string

    @Column()
    created?: Date
}



