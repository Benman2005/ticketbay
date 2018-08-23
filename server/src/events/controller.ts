import { 
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
  Body, Patch, Put 
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
    @Authorized()
    async createEvent(
     @Body() event: Event
    ) {
        return event.save()
    }

    @Patch('/events/:id([0-9]+)')
    @HttpCode(201)
    @Authorized()
    async editEvent(
    @Param('id') eventid: number,
     @Body() update: Event
    ) {
      const event = await Event.findOneById(eventid)
      if (!event) throw new NotFoundError(`Event does not exist`)
      event.eventname = update.eventname
      event.description = update.description
      event.date = update.date
      event.photo = update.photo
        await event.save()
        return event
    }
}
