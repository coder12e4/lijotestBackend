import { IsString } from 'class-validator';

export class CreateSubmissionDto {

  @IsString()
  name: string;

  @IsString()
  place: string;

  @IsString()
  blood_group: string;

 
  photo: string;

  @IsString()
  contact: string;
}
