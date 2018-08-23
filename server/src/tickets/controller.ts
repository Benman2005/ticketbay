import { JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
    Body, Patch } from 'routing-controllers'
  import User from '../users/entity'
  import {Event} from '../events/entities'
  import Ticket from './entities'
  
  @JsonController()
  export default class EventController {
     
    @Get('/tickets')
    allTickets = async() => {
      const tickets = await Ticket.find()
      return { tickets }
    }

    @Get('/tickets/:id([0-9]+)')
    getAllTickets(@Param('id') id: number) {
        return Ticket.findOneById(id)
    }

    @Get('/events/:id([0-9]+)/tickets')
    getEventTickets(@Param('id') id: number) {
        return Ticket.find({where: {eventid: id}})
    }

    @Get('/users/:id([0-9]+)/tickets')
    getTicketComments(@Param('id') id: number) {
        return Ticket.find({where: {userid: id}})
    }
    
    @Get('/events/:id([0-9]+)')
    getEvent(
      @Param('id') id: number
    ) {
      return Event.findOneById(id)
    }

  }
  