import { Exclude } from 'class-transformer';
import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'genres' })
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
