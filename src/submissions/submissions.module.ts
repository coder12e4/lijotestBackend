import { Module } from '@nestjs/common';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './submission.entity';
import { Event } from '../events/event.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Submission,Event])],
  controllers: [SubmissionsController],
  providers: [SubmissionsService]
})
export class SubmissionsModule {}
