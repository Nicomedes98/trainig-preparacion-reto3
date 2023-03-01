import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if(req.method === 'POST'){
      console.log("Se ejecuto un metodo POST");
    } else{
      console.log("Se ejecuto un metodo PUT");
      console.log("El id del usuario es: "+ req.params.uuid);
    }
    console.log(req.body);
    next();
  }
}