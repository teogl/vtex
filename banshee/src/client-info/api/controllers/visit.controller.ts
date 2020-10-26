import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientInfoDto } from '../dtos/client-info.dto';
import { CreateVisitDto } from '../dtos/create-visit.dto';
import { UpdateVisitDto } from '../dtos/update-visit.dto';
import { VisitDto } from '../dtos/visit.dto';
import { VisitService } from '../services/visit.service';

@ApiTags('Client visits')
@Controller('clients/:id/visits')
export class VisitController {

  constructor(
    private readonly visitService: VisitService
  ) { }

  @Post()
  @ApiResponse({ type: ClientInfoDto })
  create(
    @Param('id') id: string,
    @Body() data: CreateVisitDto
  ): Promise<VisitDto> {
    return this.visitService.create({ ...data, clientInfoId: id });
  }

  @Patch('/:visitId')
  @ApiResponse({ type: VisitDto })
  update(
    @Param('id') clientInfoId: string,
    @Param('visitId') id: string,
    @Body() data: UpdateVisitDto
  ): Promise<VisitDto> {
    return this.visitService.update({ ...data, id, clientInfoId });
  }

  @Get()
  @ApiResponse({ type: VisitDto, isArray: true })
  findAll(
    @Param('id') clientInfoId: string
  ): Promise<VisitDto[]> {
    return this.visitService.findAll({ clientInfoId });
  }


}
