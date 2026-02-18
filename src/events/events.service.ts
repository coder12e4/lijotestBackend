import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { User } from '../users/user.entity';
import { Submission } from 'src/submissions/submission.entity';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
     @InjectRepository(Submission)
    private submissionRepo:Repository<Submission>
  ) {}

  async create(createEventDto: CreateEventDto, user: any) {

    const event = this.eventRepo.create({
      ...createEventDto,
      createdBy: { id: user.sub } as User,
    });

    return this.eventRepo.save(event);
  }

  async findAll() {
    return this.eventRepo.find({
      relations: ['createdBy'],
    });
  }

  async findOne(id: string) {
    return this.eventRepo.findOne({
      where: { id },
      relations: ['createdBy'],
    });
  }

async findByEvent(eventId: string) {
  return this.submissionRepo.find({
    where: {
      event: { id: eventId },
    },
    relations: ['event'],
  });
}






}
