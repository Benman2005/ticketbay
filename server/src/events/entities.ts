import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'


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

}


