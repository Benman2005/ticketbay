import { JsonController, Authorized, CurrentUser, Post, Param, HttpCode, Get, Body, } from 'routing-controllers'
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

    @Post('/tickets/:id([0-9]+)/comments')
    @HttpCode(201)
    @Authorized()
    async createComment(
     @Body() comment: Comment
    ) {
        return comment.save()
    }

}