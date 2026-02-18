import { Controller, Post,Get, Body, Param, UseInterceptors, UploadedFile,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Patch } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Controller('event')
export class SubmissionsController {

  constructor(private submissionsService: SubmissionsService) {}

  @Post(':eventId/submit')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = Date.now() + '-' + file.originalname;
          cb(null, filename);
        },
      }),
    }),
  )




  create(
    @Param('eventId') eventId: string,
    @Body() body: CreateSubmissionDto,
    @UploadedFile() file,
  ) {



    if (file) {
      body.photo = file.filename;
    }

    return this.submissionsService.create(eventId, body);
  }

@Get(':eventId/submissions')
getSubmissions(@Param('eventId') eventId: string) {
  return this.submissionsService.findByEvent(eventId);
}

@Patch('submission/:id/approve')
approve(@Param('id') id: string) {
  return this.submissionsService.approve(id);
}

@Get(':eventId/print')
getForPrint(@Param('eventId') eventId: string) {
  return this.submissionsService.getApprovedForPrint(eventId);
}

@Get("submissions")
findAll() {
  return this.submissionsService.findAll();
}



}

