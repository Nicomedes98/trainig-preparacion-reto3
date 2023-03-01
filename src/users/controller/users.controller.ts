import { Controller, Get, Post, NotFoundException, Body, Param, Delete, Put, Patch, UseInterceptors, UseGuards } from '@nestjs/common';

import { UsersService } from '../users.service';
import { User } from '../interface/users.interface';
import { IncludeNullInterceptor } from '../interceptors/modif.intercerptor';
import { AuthGuard } from '../auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  getUsers(): User[] {
    return this.usersService.getUsers();
  }


  @Get(':uuid')
  @UseInterceptors(IncludeNullInterceptor)
  getUser(@Param('uuid') uuid: string): User {
    const user = this.usersService.getUser(uuid);
    if (!user) {
      throw new NotFoundException(`Usuario no encontrado f ${uuid}`);
    }
    return user;
  }


  @Post()
  @UseInterceptors(IncludeNullInterceptor)
  @UseGuards(AuthGuard)
  createUser(@Body() user: User): User {
    const createdUser = this.usersService.createUser(user);
    return createdUser;
  }
 
  @Put(':uuid')
  @UseInterceptors(IncludeNullInterceptor)
  @UseGuards(AuthGuard)
  updateUser(@Param('uuid') uuid: string, @Body() user: User): User {
    const updatedUser = this.usersService.updateUser(uuid, user);
    return updatedUser;
  }  


  @Patch(':uuid')
  @UseInterceptors(IncludeNullInterceptor)
  @UseGuards(AuthGuard)
  patchUser(@Param('uuid') uuid: string, @Body() fieldsToUpdate: Partial<User>): User {
    const updatedUser = this.usersService.patchUser(uuid, fieldsToUpdate);
    if (!updatedUser) {
      throw new NotFoundException(`Usuario no encontrado f ${uuid}`);
    }
    return updatedUser;
  }
 
  @Delete(':uuid')
  @UseGuards(AuthGuard)
deleteUser(@Param('uuid') uuid: string): boolean {
  const deletedUser = this.usersService.deleteUser(uuid);
  if (!deletedUser) {
    throw new NotFoundException(`Usuario no encontrado  ${uuid}`);
  }
  return true;
}
}

