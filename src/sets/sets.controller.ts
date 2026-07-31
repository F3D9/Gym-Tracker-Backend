import {  Controller, Get, Post, Put, Delete,Body, Param } from '@nestjs/common';
import { SetsService } from './sets.service';
import { SetsDto } from 'src/dtos/sets.dto';

@Controller('sets')
export class SetsController {

    constructor(private readonly setsService: SetsService) {}
    
    @Get()
    async getAllSets() {
        return this.setsService.getAllSets();
    }

    @Get(':id')
    async getSetById(@Param('id') id:string) {
        return this.setsService.getSetById(Number(id));
    }

    @Post(':id')
    async createSet(@Param('id') routine_id: string, @Body() data: SetsDto) {
        return this.setsService.createSet(Number(routine_id), data);
    }

    @Put(':id')
    async updateSet(@Param('id') id: string, @Body() data: SetsDto) {
        return this.setsService.updateSet(Number(id), data);
    }

    @Delete(':id')
    async deleteSet(@Param('id') id: string) {
        return this.setsService.deleteSet(Number(id));
    }   
}
