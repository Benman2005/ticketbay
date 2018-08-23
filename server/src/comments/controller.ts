import { JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, Body, Patch } from 'routing-controllers'
import User from '../users/entity'
import {Comment} from '../comments/entities'


@JsonController()
export default class CommentController {
    
    @Get('/comments')
    allComments = async() => {
    const comments = await Comment.find()
    return { comments }
    }

    @Get('/comments/:id([0-9]+)')
    getComment(
    @Param('id') id: number
    ) {
    return Comment.findOneById(id)
    }

    @Get('/tickets/:id([0-9]+)/comments')
    getTicketComments(@Param('id') id: number) {
        return Comment.find({where: {ticketid: id}})
    }
}