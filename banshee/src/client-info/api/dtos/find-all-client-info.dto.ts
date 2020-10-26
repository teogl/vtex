import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindAllClientInfoQueryDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  skip?: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  take?: number;
}
