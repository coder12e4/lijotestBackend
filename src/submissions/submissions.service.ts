import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Submission } from './submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Event } from '../events/event.entity';

import { SubmissionStatus } from '../common/enums/submission-status.enum';



@Injectable()
export class SubmissionsService {

  constructor(
    @InjectRepository(Submission)
    private submissionRepo: Repository<Submission>,

    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
  ) {}

  async create(eventId: string, dto: CreateSubmissionDto) {

    const event = await this.eventRepo.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const submission = this.submissionRepo.create({
      ...dto,
      event,
    });

    return this.submissionRepo.save(submission);
  }


async findByEvent(eventId: string) {
    return this.submissionRepo.find({
      where: {
        event: { id: eventId },
      },
      relations: ['event'],
    });
  }

  async approve(id: string) {

  const submission = await this.submissionRepo.findOne({
    where: { id },
  });

  if (!submission) {
    throw new NotFoundException('Submission not found');
  }

  submission.status = SubmissionStatus.APPROVED;

  return this.submissionRepo.save(submission);
}



async getApprovedForPrint(eventId: string) {
  return this.submissionRepo.find({
    where: {
      event: { id: eventId },
      status: SubmissionStatus.APPROVED,
    },
    relations: ['event'],
  });
}

async findAll() {
  return this.submissionRepo.find({
    relations: ["event"],
    order: {
      created_at: "DESC",
    },
  });
}





}
