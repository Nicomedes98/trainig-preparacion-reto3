import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { UsersController } from './controller/users.controller';
import { UsersService} from './users.service';
import { LoggerMiddleware } from './logger.middleware';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST }, { path: 'users/:uuid', method: RequestMethod.PUT });
  }
}
