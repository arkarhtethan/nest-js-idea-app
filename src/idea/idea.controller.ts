/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { IdeaDTO } from './idea.dto';
import { IdeaEntity } from './idea.entity';
import { IdeaService } from './idea.service';

@Controller('idea')
export class IdeaController {
    constructor(private ideaServie: IdeaService) { }

    @Get()
    showAllIdea (): Promise<IdeaEntity[]> {
        return this.ideaServie.showAll();
    }

    @Post()
    createIdea (@Body() idea: IdeaDTO) {
        return this.ideaServie.create(idea);
    }

    @Get(':id')
    readIdea (@Param('id') id: string): Promise<IdeaEntity> {
        return this.ideaServie.read(id);
    }

    @Put(':id')
    updateIdea (
        @Param('id') id: string,
        @Body() data: Partial<IdeaEntity>
    ): Promise<IdeaEntity> {
        return this.ideaServie.update(id, data);
    }

    @Delete(':id')
    destroyIdea (@Param('id') id: string) {
        return this.ideaServie.destroy(id);
    }
}
