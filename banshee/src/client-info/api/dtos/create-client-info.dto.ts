import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsMongoId, IsNumber, IsPositive, IsString, MaxLength, ValidateIf } from 'class-validator';

export class CreateClientInfoDto {

  @Expose()
  @IsDefined()
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  nit: string;

  @Expose()
  @IsDefined()
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
  @IsPositive()
  @IsDefined()
  @ApiProperty()
  space: number;

  @Expose()
  @IsNumber()
  @IsDefined()
  @IsPositive()
  @ApiProperty()
  percentageVisits: number;
}
