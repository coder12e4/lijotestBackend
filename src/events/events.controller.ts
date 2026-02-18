import {Controller, Post, Get, Param, Body, Req, UseGuards,} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {

  constructor(private eventsService: EventsService) {}

  @Post()
  create(@Body() body: CreateEventDto, @Req() req) {
   console.log("body",req)

    return this.eventsService.create(body, req.user);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }
}
