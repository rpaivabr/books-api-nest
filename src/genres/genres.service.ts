import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genreToCreate = new Genre();
    genreToCreate.name = createGenreDto.name;
    return this.genresRepository.save(genreToCreate);
  }

  async findAll(): Promise<Genre[]> {
    return this.genresRepository.find();
  }

  async findOne(id: string): Promise<Genre> {
    return this.getGenreById(id);
  }

  async update(id: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const genreToUpdate = await this.getGenreById(id);
    genreToUpdate.name = updateGenreDto.name;
    return this.genresRepository.save(genreToUpdate);
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.genresRepository.delete(id);
    if (!affected) throw new BadRequestException();
  }

  private async getGenreById(id: string): Promise<Genre> {
    const genre = await this.genresRepository.findOne({
      where: { id },
    });
    if (!genre) throw new NotFoundException();
    return genre;
  }
}
