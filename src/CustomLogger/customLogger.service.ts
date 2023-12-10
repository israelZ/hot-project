import {ConsoleLogger,Logger } from '@nestjs/common';
import { Request } from 'express';
import * as _ from "lodash";

export class CustomLogger extends ConsoleLogger {

  start(req:Request) {
    this.log(`START ${req.method} URL:${req.url}`);

    if (!_.isEmpty(req.params)) {
      this.log(`params:${JSON.stringify(req.params)}`)
    }

    if (req.method=='POST') {
      this.log(`body:${JSON.stringify(req.body)}`,)
    }
  }
  
  finish(req:Request,res:Object) {
    this.log(`FINISH ${req.method} URL:${req.url} with response:${JSON.stringify(res)}`);
  }

  errorGeneral(req:Request,error:Error) {

    this.error(`ERROR ${req.method} URL:${req.url}`,error);
  }
}