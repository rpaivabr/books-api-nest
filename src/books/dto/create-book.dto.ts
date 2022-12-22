import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  isbn: string;

  year: number;

  @IsUUID()
  authorId: string;

  @IsUUID()
  genreId: string;
}
