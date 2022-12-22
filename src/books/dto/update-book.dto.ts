import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty()
  title: string;

  isbn: string;

  year: number;

  @IsUUID()
  authorId: string;

  @IsUUID()
  genreId: string;
}
