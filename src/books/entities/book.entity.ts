import { Transform } from 'class-transformer';
import { Author } from 'src/authors/entities/author.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { toLocaleTime } from 'src/helpers/timezone.helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  isbn: string;

  @Column()
  year: number;

  @Transform(toLocaleTime)
  @CreateDateColumn()
  createdAt: Date;

  @Transform(toLocaleTime)
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
  author: Author;

  @ManyToOne(() => Genre, (genre) => genre.books, { onDelete: 'CASCADE' })
  genre: Genre;
}
