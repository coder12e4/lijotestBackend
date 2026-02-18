import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Submission } from 'src/submissions/submission.entity';

@Module({
imports:[TypeOrmModule.forFeature([Event,Submission])],

  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
