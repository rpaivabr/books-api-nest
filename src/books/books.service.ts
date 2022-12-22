import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const bookToCreate = this.initBook(createBookDto);
    return this.booksRepository.save(bookToCreate);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({
      relations: ['author', 'genre'],
    });
  }

  async findOne(id: string): Promise<Book> {
    return this.getBookById(id);
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.getBookById(id);
    const bookToUpdate = this.initBook(updateBookDto);
    bookToUpdate.id = id;
    return this.booksRepository.save(bookToUpdate);
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.booksRepository.delete(id);
    if (!affected) throw new BadRequestException();
  }

  private async getBookById(id: string): Promise<Book> {
    const genre = await this.booksRepository.findOne({
      where: { id },
      relations: ['author', 'genre'],
    });
    if (!genre) throw new NotFoundException();
    return genre;
  }

  private initBook(dto: CreateBookDto | UpdateBookDto): Book {
    const book = new Book();
    book.title = dto.title;
    book.isbn = dto.isbn;
    book.year = dto.year;
    book.genre = { id: dto.genreId } as Genre;
    book.author = { id: dto.authorId } as Author;
    return book;
  }
}
