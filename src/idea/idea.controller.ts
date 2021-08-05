/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import {
    Body, Controller, Delete, Get, Param, Post, Put, UsePipes,
    // ValidationPipe
} from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { CreateIdeaDto } from './create-idea.dto';
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
    @UsePipes(new ValidationPipe())
    createIdea (@Body() idea: CreateIdeaDto) {
        return this.ideaServie.create(idea);
    }

    @Get(':id')
    readIdea (@Param('id') id: string): Promise<IdeaEntity> {
        return this.ideaServie.read(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateIdea (
        @Param('id') id: string,
        @Body() data: Partial<CreateIdeaDto>,
    ) {
        return this.ideaServie.update(id, data);
    }

    @Delete(':id')
    destroyIdea (@Param('id') id: string) {
        return this.ideaServie.destroy(id);
    }
}
