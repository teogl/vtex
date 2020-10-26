import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CityDto } from './city.dto';

export class StateDto {

  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Type(() => CityDto)
  @Expose()
  @ApiProperty({ type: CityDto, isArray: true })
  cities: CityDto[];
}
