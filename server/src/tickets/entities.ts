import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'
import {Comment} from '../comments/entities'
import {Event} from '../events/entities'


@Entity()
export class Ticket extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    event: string

    @Column()
    photo: string
   
    @Column()
    starttime: Date

    @Column()
    endttime: Date
    
    @Column()
    comment: string

    // this is a relation, read more about them here:
    // http://typeorm.io/#/many-to-one-one-to-many-relations
    // @OneToMany(_ => Player, player => player.game, {eager:true})
    // players: Player[]
}

// @Entity()
// @Index(['game', 'user', 'symbol'], {unique:true})
// export class Player extends BaseEntity {

//     @PrimaryGeneratedColumn()
//     id?: number

//     @ManyToOne(_ => User, user => user.players)
//     user: User

//     @ManyToOne(_ => Game, game => game.players)
//     game: Game

//     // @Column()
//     // userId: number

//     @Column('char', {length: 1})
//     symbol: Symbol
// }
