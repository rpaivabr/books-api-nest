import { IsNotEmpty } from 'class-validator';

export class UpdateGenreDto {
  @IsNotEmpty()
  name: string;
}
