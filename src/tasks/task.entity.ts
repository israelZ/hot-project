import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {STATUS_TASK} from "../constants";

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    arrNumbers: string

    @Column()
    action: number

    @Column({default:0})
    result: number

    @Column({default: STATUS_TASK.WAITING})
    status: string
}