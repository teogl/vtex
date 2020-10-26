import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { StateDto } from './state.dto';

export class CountryDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Type(() => StateDto)
  @Expose()
  @ApiProperty({ type: StateDto, isArray: true })
  states: StateDto[];
}