import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CityDto {

  @Expose()
  @IsString()
  @ApiProperty()
  id: string;

  @Expose()
  @IsString()
  @ApiProperty()
  name: string;
}
