import { Controller, Get, Post, Put, Delete,Body, Param, UseGuards, Request } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutineDto } from 'src/dtos/routine.dto';
import { AuthGuard } from 'src/auth/auth.guards';

@Controller('routines')
export class RoutinesController {

    constructor(private readonly routinesService: RoutinesService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAllRoutines(@Request() req:any) {
        return this.routinesService.getAllRoutines(req.user.user_id);
    }

    @Get(':id')
    async getRoutineById(@Param('id') id: string) {
        return this.routinesService.getRoutineById(Number(id));
    }

    @UseGuards(AuthGuard)
    @Post()
    async createRoutine(@Body() data: RoutineDto, @Request() req:any) {
        return this.routinesService.createRoutine(req.user.user_id,data);
    }

    @Put(':id')
    async updateRoutine(@Param('id') id: string, @Body() data: RoutineDto) {
        return this.routinesService.updateRoutine(Number(id), data);
    }

    @Delete(':id')
    async deleteRoutine(@Param('id') id: string) {
        return this.routinesService.deleteRoutine(Number(id));
    }   

}
