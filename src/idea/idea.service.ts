/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateIdeaDto, IdeaResponseObject } from './create-idea.dto';
import { IdeaEntity } from './idea.entity';

@Injectable()
export class IdeaService {
    constructor(
        @InjectRepository(IdeaEntity)
        private ideaRepository: Repository<IdeaEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    private toResponseObject (idea: IdeaEntity) {
        return { ...idea, author: idea.author.toResponseObject(false) }
    }

    private ensureOwnership (idea: IdeaEntity, userId: string) {
        if (idea.author.id !== userId) {
            throw new HttpException('Incorret User', HttpStatus.UNAUTHORIZED)
        }
    }

    async showAll (): Promise<IdeaResponseObject[]> {
        const ideas = await this.ideaRepository.find({ relations: ['author'] });
        return ideas.map(idea => this.toResponseObject(idea));
    }

    async create (userId: string, data: CreateIdeaDto) {
        const user = await this.userRepository.findOne({ where: { id: userId } })
        const idea = await this.ideaRepository.create({ ...data, author: user });
        await this.ideaRepository.save(idea);
        return this.toResponseObject(idea);
    }

    async read (id: string) {
        try {
            const idea = await this.ideaRepository.findOne({ where: { id }, relations: ['author'] });
            if (!idea) {
                throw new HttpException('Not found', HttpStatus.NOT_FOUND)
            }
            return this.toResponseObject(idea);
        } catch (err) {
            if (err.code === '22P02') {
                throw new HttpException('Not found', HttpStatus.NOT_FOUND)
            }
            throw err;
        }
    }

    async update (id: string, userId: string, data: Partial<CreateIdeaDto>) {
        let idea: any = await this.ideaRepository.findOne({ where: { id }, relations: ['author'] });
        if (!idea) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        this.ensureOwnership(idea, userId);
        await this.ideaRepository.update({ id }, data);
        idea = await this.ideaRepository.findOne({ where: { id }, relations: ['author'] });
        return this.toResponseObject(idea);
    }

    async destroy (id: string, userId: string) {
        const idea = await this.ideaRepository.findOne({ where: { id }, relations: ['author'] });
        if (!idea) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        this.ensureOwnership(idea, userId);
        await this.ideaRepository.delete({ id });
        return { deleted: true };
    }
}
