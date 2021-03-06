import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, getConnection} from 'typeorm'
import { Exclude } from 'class-transformer';
import { MinLength, IsString, IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt'


@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text')
  firstName: string

  @IsString()
  @MinLength(2)
  @Column('text')
  lastName: string

  @IsEmail()
  @Column('text')
  email: string

  @IsString()
  @MinLength(3)
  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }


  
  // async createUsersDb(){
  //   await getConnection()
  //   .createQueryBuilder()
  //   .insert()
  //   .into(User)
  //   .values([
  //       { firstName: "Johnny", lastName: "Quest", email:"johnny@quest.com", password:"$2a$10$JTIu0kXgStz.bxVAYw4zA.hi.2x3U3Cn6Ep9TQaBzZIr4oFZKUOo2" }, 
  //       { firstName: "Lisa", lastName: "Lise", email: "lisa@lisa.com", password:"$2a$10$tvvp8zdFekeyGXyha1c1meUIPPpZPMnRildwxQpLSayKxdJoU5pEa"  }
  //   ])
  //   .execute();
  // }



  // // this is a relation, read more about them here:
  // // http://typeorm.io/#/many-to-one-one-to-many-relations
  // @OneToMany(_ => Player, player => player.user) 
  // players: Player[]
}
