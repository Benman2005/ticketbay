import { 
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
  Body, Patch 
} from 'routing-controllers'
import {Event} from '../events/entities'

@JsonController()
export default class EventController {
   
    @Get('/events')
    allEvents = async() => {
      const events = await Event.find()
      return { events }
    }

    @Get('/events/:id([0-9]+)')
    getOneEvent(@Param('id') id: number) {
      return Event.find({where: {id:id}})
    }

    @Post('/events')
    @HttpCode(201)
    async createEvent(
     @Body() event: Event
    ) {
        return event.save()
    }
}
