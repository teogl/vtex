import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedResultDto } from 'src/core/dtos/paginated-result.dto';
import { ClientInfoDto } from '../dtos/client-info.dto';
import { CreateClientInfoDto } from '../dtos/create-client-info.dto';
import { FindAllClientInfoQueryDto } from '../dtos/find-all-client-info.dto';
import { UpdateClientInfoDto } from '../dtos/update-client-info.dto';
import { ClientInfoService } from '../services/client-info.service';

@ApiTags('Client info')
@Controller('clients')
export class ClientInfoController {

  constructor(
    private readonly clientInfoService: ClientInfoService
  ) { }

  @Post()
  @ApiResponse({ type: ClientInfoDto })
  create(@Body() data: CreateClientInfoDto): Promise<ClientInfoDto> {
    return this.clientInfoService.create(data);
  }

  @Patch('/:id')
  @ApiResponse({ type: ClientInfoDto })
  update(
    @Param('id') id: string,
    @Body() data: UpdateClientInfoDto
  ): Promise<ClientInfoDto> {
    return this.clientInfoService.update({ ...data, id });
  }

  @Get()
  @ApiResponse({ type: ClientInfoDto, isArray: true })
  findAll(
    @Query() query: FindAllClientInfoQueryDto
  ): Promise<PaginatedResultDto<ClientInfoDto>> {
    return this.clientInfoService.findAll(query);
  }

  @Delete('/:id')
  @ApiResponse({ type: ClientInfoDto })
  delete(
    @Param('id') id: string
  ): Promise<{ id: string }> {
    return this.clientInfoService.delete({ id });
  }
}
