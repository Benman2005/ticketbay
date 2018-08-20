import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'
import {Ticket} from '../tickets/entities'

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    //   @Column('text', {default: emptyBoard})
    //   board: Board

    //   @Column('char', {length:1, default: 'x'})
    //   turn: Symbol

    //   @Column('char', {length:1, nullable: true})
    //   winner: Symbol

    @Column('char')
    name: string

    @Column('char')
    ticket: Ticket



    // this is a relation, read more about them here:
    // http://typeorm.io/#/many-to-one-one-to-many-relations
    // @OneToMany(_ => Player, player => player.game, {eager:true})
    // players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    // @ManyToOne(_ => User, user => user.players)
    // user: User

    // @ManyToOne(_ => Game, game => game.players)
    // game: Game

    // @Column()
    // userId: number

    @Column('char', {length: 1})
    symbol: Symbol
}
