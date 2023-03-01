import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersDto } from '../dto/users.dto';

@Injectable()
export class IncludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((user: UsersDto) => {
        if(!user.hasOwnProperty('lastName')){
            user.lastName = 'null';
        }
        return user; 
        }));
  }
}