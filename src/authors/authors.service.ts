import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const authorToCreate = new Author();
    authorToCreate.name = createAuthorDto.name;
    return this.authorsRepository.save(authorToCreate);
  }

  async findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  async findOne(id: string): Promise<Author> {
    return this.getAuthorById(id);
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const authorToUpdate = await this.getAuthorById(id);
    authorToUpdate.name = updateAuthorDto.name;
    return this.authorsRepository.save(authorToUpdate);
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.authorsRepository.delete(id);
    if (!affected) throw new BadRequestException();
  }

  private async getAuthorById(id: string): Promise<Author> {
    const author = await this.authorsRepository.findOne({
      where: { id },
    });
    if (!author) throw new NotFoundException();
    return author;
  }
}
