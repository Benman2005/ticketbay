import { 
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
  Body, Patch 
} from 'routing-controllers'
import User from '../users/entity'
import {Event} from '../events/entities'
import Ticket from '../tickets/entities'


import {io} from '../index'

@JsonController()
export default class EventController {
   
    @Get('/events')
    allEvents = async() => {
      const events = await Event.find()
      return { events }
    }

    @Get('/events/:id([0-9]+)')
    getEvent(
      @Param('id') id: number
    ) {
      return Event.findOneById(id)
    }

    // @Get('/events/:id/tickets')
    // const user = await User.findOne({ where: { email } })

//   @Authorized()
//   @Post('/events')
//   @HttpCode(201)
//   async createEvent(
//     @CurrentUser() user: User
//   ) {
//     const entity = await Event.create().save()

//     await Event.create({
//     }).save()


    @Post('/events')
    @HttpCode(201)
    async createEvent(
     @Body() event: Event
    ) {
        return event.save()
    }


    
//     const event = await Event.findOneById(entity.id)

//     io.emit('action', {
//       type: 'ADD_GAME',
//       payload: game
//     })

//     return game
//   }

//   @Authorized()
//   @Post('/games/:id([0-9]+)/players')
//   @HttpCode(201)
//   async joinGame(
//     @CurrentUser() user: User,
//     @Param('id') gameId: number
//   ) {
//     const game = await Game.findOneById(gameId)
//     if (!game) throw new BadRequestError(`Game does not exist`)
//     if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

//     game.status = 'started'
//     await game.save()

//     const player = await Player.create({
//       game, 
//       user,
//       symbol: 'o'
//     }).save()

//     io.emit('action', {
//       type: 'UPDATE_GAME',
//       payload: await Game.findOneById(game.id)
//     })

//     return player
//   }

//   @Authorized()
//   // the reason that we're using patch here is because this request is not idempotent
//   // http://restcookbook.com/HTTP%20Methods/idempotency/
//   // try to fire the same requests twice, see what happens
//   @Patch('/games/:id([0-9]+)')
//   async updateGame(
//     @CurrentUser() user: User,
//     @Param('id') gameId: number,
//     @Body() update: GameUpdate
//   ) {
//     const game = await Game.findOneById(gameId)
//     if (!game) throw new NotFoundError(`Game does not exist`)

//     const player = await Player.findOne({ user, game })

//     if (!player) throw new ForbiddenError(`You are not part of this game`)
//     if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
//     if (player.symbol !== game.turn) throw new BadRequestError(`It's not your turn`)
//     if (!isValidTransition(player.symbol, game.board, update.board)) {
//       throw new BadRequestError(`Invalid move`)
//     }    

//     const winner = calculateWinner(update.board)
//     if (winner) {
//       game.winner = winner
//       game.status = 'finished'
//     }
//     else if (finished(update.board)) {
//       game.status = 'finished'
//     }
//     else {
//       game.turn = player.symbol === 'x' ? 'o' : 'x'
//     }
//     game.board = update.board
//     await game.save()
    
//     io.emit('action', {
//       type: 'UPDATE_GAME',
//       payload: game
//     })

//     return game
//   }

//   @Authorized()
//   @Get('/games/:id([0-9]+)')
//   getGame(
//     @Param('id') id: number
//   ) {
//     return Game.findOneById(id)
//   }

//   @Authorized()
//   @Get('/games')
//   getGames() {
//     return Game.find()
//   }
// }
}
