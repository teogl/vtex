import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CountryClientDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;
}
