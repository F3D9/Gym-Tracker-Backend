import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SetsDto } from 'src/dtos/sets.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SetsService {

    constructor(private prisma: PrismaService) {}
        
    async getAllSets(){
        return this.prisma.set.findMany();
    }

    async getSetById(id: number) {
        const sets = await this.prisma.set.findUnique({
            where: { set_id: id },
        });
        if (!sets) throw new NotFoundException(`Set ${id} not found`);
        return sets;
    }

    async createSet(routine_id: number, data: SetsDto) {
        return this.prisma.set.create({
            data:{
                ...data,
                routine_id: routine_id,
            }
            
        });
    }

    async updateSet(id: number, data: SetsDto){
        return this.prisma.set.update({
            where: { set_id: id },
            data
        });
    }

    async deleteSet(id: number) {
        return this.prisma.set.delete({
            where: { set_id: id }
        });
    }

}
