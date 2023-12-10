import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ACTION, STATUS_TASK } from '../constants';
import { Task } from './task.entity';
import * as _ from "lodash";


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,

    ) { }

    findAllTasks(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    findOneById(id) {
        return this.taskRepository.findOne({ where: { id: id } });
    }

    findValueCalc(arrNumbers: number[], action: number) {
        return this.taskRepository.findOne({
            where: {
                arrNumbers: JSON.stringify(arrNumbers),
                action: action,
                status: STATUS_TASK.IS_DONE,
            }
        });
    }




    async create(arrNumbers: number[], action: number) {
        const task = new Task();
        task.arrNumbers = JSON.stringify(arrNumbers);;
        task.action = action;

        return await this.taskRepository.save(task);
    }


    doAction(takeAction: Task) {
        const { arrNumbers, action, id } = takeAction
        const numberToCalc = JSON.parse(arrNumbers);

        let result

        switch (action) {
            case ACTION.MULTIPLY:
                result = numberToCalc?.reduce((sum, currentVal) => sum * currentVal, 1)

                break;
            case ACTION.SUM:
                result = numberToCalc?.reduce((sum, currentVal) => sum + currentVal, 0)

                break;
        }

        this.update(id, arrNumbers, action, STATUS_TASK.IS_DONE, result);

    }

    async update(id: number, arrNumbers: string, action: number, status: string, result: number) {

        const task = await this.taskRepository.findOne({ where: { id: id } });

        if (task) {
            task.arrNumbers = arrNumbers;
            task.action = action;
            task.status = status;
            task.result = result ? result : task.result;
            return this.taskRepository.save(task);
        }
        return null;  // If the task item doesn't exist, return null.
    }

    async delete(id: number) {
        return await this.taskRepository.delete(id);
    }



}
