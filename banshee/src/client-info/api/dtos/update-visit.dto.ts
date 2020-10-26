import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsMongoId } from 'class-validator';

export class UpdateVisitDto {
  id: string;
  
  clientInfoId: string;

  @Type(() => Date)
  @Expose()
  @IsDate()
  @ApiProperty()
  date: Date;

  @Expose()
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