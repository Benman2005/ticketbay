import { 
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
  Body, Patch, Delete 
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
      console.log (event)
      const entity = await event.save()
      console.log("now here")
      console.log(entity)
        return entity
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

    @Delete('/events/:id([0-9]+)')
    @HttpCode(201)
    @HttpCode(202)
    @Authorized()
    async deleteEvent(@Param('id') eventid: number) {
      return Event.removeById(eventid)
      // const entity = await Event.findOneById(eventid)
      // if (!entity) throw new NotFoundError(`Event does not exist`)
      // await entity.remove()
      // return entity 
    }

}
