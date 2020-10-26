import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsString, MaxLength, IsMongoId, ValidateIf, IsNumber } from 'class-validator';

export class UpdateClientInfoDto {

  id: string;
  
  @Expose()
  @IsString()
  @ApiProperty()
  nit: string;

  @Expose()
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  fullName: string;

  @Expose()
  @IsString()
  @MaxLength(200)
  @ApiProperty({ required: false })
  address?: string;

  @Expose()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ required: false })
  phone?: string;

  @Expose()
  @IsMongoId()
  @ApiProperty({ required: false })
  countryId?: string;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @ValidateIf(x=> x.countryId)
  @ApiProperty({ required: false })
  cityId?: string;

  @Expose()
  @IsMongoId()
  @IsDefined()
  @ValidateIf(x=> x.countryId)
  @ApiProperty({ required: false })
  stateId?: string;

  @Expose()
  @IsNumber()
  @ApiProperty()
  space: number;

  @Expose()
  @IsNumber()
  @ApiProperty()
  percentageVisits: number;
}
