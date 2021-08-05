/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIdeaDto } from './create-idea.dto';
import { IdeaEntity } from './idea.entity';

@Injectable()
export class IdeaService {
    constructor(
        @InjectRepository(IdeaEntity)
        private ideaRepository: Repository<IdeaEntity>
    ) { }

    async showAll (): Promise<IdeaEntity[]> {
        return await this.ideaRepository.find();
    }

    async create (data: CreateIdeaDto): Promise<IdeaEntity> {
        const idea = await this.ideaRepository.create(data);
        await this.ideaRepository.save(idea);
        return idea;
    }

    async read (id: string): Promise<IdeaEntity> {
        try {
            const idea = await this.ideaRepository.findOne({ where: { id } });
            if (!idea) {
                throw new HttpException('Not found', HttpStatus.NOT_FOUND)
            }
            return idea;
        } catch (err) {
            if (err.code === '22P02') {
                throw new HttpException('Not found', HttpStatus.NOT_FOUND)
            }
            throw err;
        }
    }

    async update (id: string, data: Partial<CreateIdeaDto>) {
        const idea = await this.ideaRepository.update({ id }, data);
        if (!idea) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        await this.ideaRepository.findOne({ id });
        return idea;
    }

    async destroy (id: string) {
        await this.ideaRepository.delete({ id });
        return { deleted: true };
    }
}
