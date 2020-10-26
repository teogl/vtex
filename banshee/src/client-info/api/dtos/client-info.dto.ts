import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CityClientDto } from './city.dto';
import { CountryClientDto } from './country.dto';
import { StateClientDto } from './state.dto';

export class ClientInfoDto {

  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  nit: string;

  @Expose()
  @ApiProperty()
  fullName: string;

  @Expose()
  @ApiProperty({ required: false })
  address?: string;

  @Expose()
  @ApiProperty({ required: false })
  phone?: string;

  @Type(() => CityClientDto)
  @Expose()
  @ApiProperty({ type: CityClientDto, required: false })
  city: CityClientDto;

  @Type(() => StateClientDto)
  @Expose()
  @ApiProperty({ type: StateClientDto, required: false })
  state: StateClientDto;

  @Type(() => CountryClientDto)
  @Expose()
  @ApiProperty({ type: CountryClientDto, required: false })
  country: CountryClientDto;

  @Expose()
  @ApiProperty()
  space: number;

  @Expose()
  @ApiProperty()
  spaceBalance: number;

  @Expose()
  @ApiProperty()
  percentageVisits: number;

}
