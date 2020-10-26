import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { SellerDto } from './seller.dto';

export class VisitDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  date: Date;

  @Type(() => SellerDto)
  @Expose()
  @ApiProperty()
  seller: SellerDto;

  @Expose()
  @ApiProperty()
  total: number;

  @Expose()
  @ApiProperty()
  totalVisit: number;

  @Expose()
  @ApiProperty({ required: false })
  description?: string;
}
