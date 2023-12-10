import { ApiProperty } from '@nestjs/swagger';
import { ACTION } from '../constants';

export class TaskDTO{

    id: number

    @ApiProperty({type:Array<Number>, description:'arr numbers',example:[1,3,5,7,7]})
    arrNumbers: Array<number>

    @ApiProperty({type:Number, description:'action',example:ACTION.MULTIPLY})
    action: number

    status: number
}