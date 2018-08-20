import { getConnection, BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'
import {Ticket} from '../tickets/entities'

// export type Symbol = 'x' | 'o'
// export type Row = [ Symbol | null, Symbol | null, Symbol | null ]
// export type Board = [ Row, Row, Row ]

// type Status = 'pending' | 'started' | 'finished'

// const emptyRow: Row = [null, null, null]
// const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow ]

@Entity()
export class Event extends BaseEntity {


    @PrimaryGeneratedColumn()
    id?: number

    @Column({nullable:true})
    name?: string

    @Column({nullable:true})
    lastname?: string

    // @Column({ nullable: true })
    // starttime?: Date

    // @Column({ nullable: true })
    // endtime?: Number

    // @Column('char')
    // ticket: Ticket

   
    async createEventsDb(){
        await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Event)
        .values([
            { name: "Johnny"  }, 
        ])
        .execute();
      }
    //   createEventsDb()

    // this is a relation, read more about them here:
    // http://typeorm.io/#/many-to-one-one-to-many-relations
    // @OneToMany(_ => Player, player => player.game, {eager:true})
    // players: Player[]
}


