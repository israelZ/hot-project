import { Controller, Get, Post, Body, Param, Delete, Req, Res } from '@nestjs/common';
import { CustomLogger } from '../CustomLogger/customLogger.service';
import { Request, Response } from 'express';
import { TasksService } from './tasks.service'
import { TaskDTO } from '../models/Task'
import { ApiBody } from '@nestjs/swagger';
import { RES_DB, STATUS_TASK, ERROR } from '../constants';
import { isValidToCalc } from '../utils';

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService,
        private customLogger: CustomLogger) {
        this.customLogger.setContext(TasksController.name);
    }

    @Get()
    async getAllTask(
        @Req() req: Request,
        @Res() res: Response) {

        this.customLogger.start(req);
        try {
            const dateTasksRes = await this.tasksService.findAllTasks()

            this.customLogger.finish(req, dateTasksRes);
            return res.status(200).json(dateTasksRes);
        }
        catch (error) {
            this.customLogger.error(req, error);
            return res.status(200).json(ERROR.GENERAL);
        }
    }

    @Get('status/:id')
    async getStatusById(
        @Param('id') id: number,
        @Req() req: Request,
        @Res() res: Response) {

        this.customLogger.start(req);

        try {
            const taskRes = await this.tasksService.findOneById(id);

            this.customLogger.finish(req, taskRes);
            if(taskRes)
            {
                return res.status(200).json({id:taskRes.id,status:taskRes.status});   
            }
            
            return res.status(404).json(ERROR.NOT_FOUND);   
        }
        catch (error) {
            this.customLogger.error(req, error);
            return res.status(400).json(ERROR.GENERAL);   
        }
    }

    @Get('result/:id')
    async getResultById(
        @Param('id') id: number,
        @Req() req: Request,
        @Res() res: Response) {
            this.customLogger.start(req);
        try {
            const taskRes = await this.tasksService.findOneById(id)

            this.customLogger.finish(req, taskRes);

            if(taskRes)
            {
                const response = taskRes.status==STATUS_TASK.IS_DONE ? {id:taskRes.id,result:taskRes.result} :RES_DB.STATUS_WAITE
                return res.status(200).json(response);   
            }
            
            return res.status(404).json(ERROR.NOT_FOUND);   
        }
        catch (error) {
            this.customLogger.error(req, error);
            return res.status(400).json(ERROR.GENERAL);   
        }
    }


    @Post('create-and-execute')
    @ApiBody({ type: TaskDTO })
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Body() task: TaskDTO) {
    
        this.customLogger.start(req);

        try {
            const { arrNumbers, action } = task
            if (isValidToCalc(arrNumbers ,action)) {
                const numbersSorted=arrNumbers.sort()
                
                const taskCalc = await this.tasksService.findValueCalc(numbersSorted, action);
                if (taskCalc) {
                    this.customLogger.finish(req, taskCalc);
                    return res.json(`the valued is already calc and result- ${taskCalc.result}`).status(200)
                }

                const taskRes = await this.tasksService.create(numbersSorted, action);
                
                this.tasksService.doAction(taskRes)
                
                this.customLogger.finish(req, taskRes);
                return res.json(taskRes).status(200)
            }
            else{
                this.customLogger.finish(req,`one or more values is not valid arrNumbers:${arrNumbers} action:${action}`)
                return res.status(200).json('values is not valid')
            }
        }
        catch (error) {
            this.customLogger.error(req, error);
            return res.status(400).json(ERROR.GENERAL);   
        }
    }

    @Delete('delete:id')
    async delete(
        @Req() req: Request,
        @Res() res: Response,
        @Param('id') id: number) {
            this.customLogger.start(req);

        try {
            const taskRes =await this.tasksService.delete(id)

            this.customLogger.finish(req, taskRes);
            return res.send(`${taskRes?.affected} items delete`).status(200)
        }
        catch (error) {
            this.customLogger.error(req, error);
            return res.status(400).json(ERROR.GENERAL);   
        }
    }

}
