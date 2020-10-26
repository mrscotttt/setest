import { Controller, Post, Put, Body, Param, Get, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { FollowDto } from './dto/follow.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';
import { QueryDto } from './dto/query.dto';
import { Types } from 'mongoose';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventService : EventsService,
  ){}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createEvent(@Body() createEventDto : CreateEventDto , @Request() req : any){
    createEventDto.organizer_id = Types.ObjectId(req.user.userId);
    return await this.eventService.createEvent(createEventDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateEvent(@Body() createEventDto : CreateEventDto,@Param() param){
    return await this.eventService.updateEvent(param.id, createEventDto)
  }

  @Get(':id/detail')
  @UseGuards(JwtAuthGuard)
  async getDetailedEvent(@Param() param){
    return await this.eventService.getDetailedEvent(param.id)
  }

  @Post('follow')
  @UseGuards(JwtAuthGuard)
  async followEvent(@Body() followDto : FollowDto ){
    return await this.eventService.followEvent(followDto)
  }

  @Post('unfollow')
  @UseGuards(JwtAuthGuard)
  async unFollowEvent(@Body() followDto : FollowDto){
    return await this.eventService.unFollow(followDto);
  }

  @Post('/search')
  @UseGuards(JwtAuthGuard)
  async search(@Body() queryDto : QueryDto){
    return await this.eventService.searchEvent(queryDto)
  }
}
