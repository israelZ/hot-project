import * as _ from "lodash";
import { ACTION } from './constants';

export function isValidToCalc(numbersToCalc:Number[],action:number){

    return (numbersToCalc.every(item=>typeof item === 'number') && _.values(ACTION).includes(action))
}