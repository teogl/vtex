import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountryDto } from '../dtos/country.dto';
import { FindAllQueryDto } from '../dtos/find-all-query.dto';
import { CountryService } from '../services/country.service';

@ApiTags('Country')
@Controller('countries')
export class CountryController {

  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiResponse({ type: CountryDto, isArray: true })
  findAll(
    @Query() query: FindAllQueryDto
  ): Promise<CountryDto[]> {
    return this.countryService.findAll(query);
  }

}
