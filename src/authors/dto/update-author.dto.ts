import { IsNotEmpty } from 'class-validator';

export class UpdateAuthorDto {
  @IsNotEmpty()
  name: string;
}
