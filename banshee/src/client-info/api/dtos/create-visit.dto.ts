import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsDefined, IsMongoId } from 'class-validator';

export class CreateVisitDto {

  clientInfoId: string;

  @Type(() => Date)
  @Expose()
  @IsDefined()
  @IsDate()
  @ApiProperty()
  date: Date;

  @Expose()
  @IsDefined()
  @IsMongoId()
  @ApiProperty()
  sellerId: string;

  @Expose()
  @ApiProperty()
  total: number;

  @Expose()
  @ApiProperty({ required: false })
  description?: string;
}
