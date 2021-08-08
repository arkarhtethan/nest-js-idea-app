/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import {
    Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes,
} from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { User } from 'src/user/user.decorator';
import { CreateIdeaDto } from './create-idea.dto';
import { IdeaEntity } from './idea.entity';
import { IdeaService } from './idea.service';

@Controller('api/idea')
export class IdeaController {
    constructor(private ideaServie: IdeaService) { }

    @Get()
    showAllIdea () {
        return this.ideaServie.showAll();
    }

    @Post()
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    createIdea (
        @User('id') userId,
        @Body() idea: CreateIdeaDto
    ) {
        return this.ideaServie.create(userId, idea);
    }

    @Get(':id')
    readIdea (@Param('id') id: string): Promise<IdeaEntity> {
        return this.ideaServie.read(id);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    updateIdea (
        @Param('id') id: string,
        @User('id') user: string,
        @Body() data: Partial<CreateIdeaDto>,
    ) {
        return this.ideaServie.update(id, user, data);
    }

    @Delete(':id')
    destroyIdea (@Param('id') id: string, @User('id') user: string,) {
        return this.ideaServie.destroy(id, user);
    }
}
