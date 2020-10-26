import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllSellerQueryDto } from '../dtos/find-all-seller-query.dto';
import { SellerDto } from '../dtos/seller.dto';
import { SellerService } from '../services/seller.service';

@ApiTags('Seller')
@Controller('sellers')
export class SellerController {

  constructor(private readonly sellerService: SellerService) {}

  @Get()
  @ApiResponse({ type: SellerDto, isArray: true })
  findAll(
    @Query() query: FindAllSellerQueryDto
  ): Promise<SellerDto[]> {
    return this.sellerService.findAll(query);
  }

}
