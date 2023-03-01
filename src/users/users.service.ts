import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './interface/users.interface';
import { UsersDto } from 'src/users/dto/users.dto';
import { UsersPatchDto } from 'src/users/dto/patch.dto';


@Injectable()
export class UsersService {
  private users: User[] = [
    {
      uuid: '1',
      name: 'John',
      lastName: 'Rambo',
      email: 'jrambo@gmail.com',
    },
    {
      uuid: '2',
      name: 'Ana',
      lastName: 'Rodriguez',
      email: 'anarod@hotmail.com',
    },
    {
      uuid: '3',
      name: 'Bart',
      lastName: 'Gonzales',
      email: 'gonazabart@gmail.com',
    },
  ];


  getUsers(): User[] {
    return this.users;
  }


  getUser(uuid: string): User {
    const user = this.users.find(user => user.uuid === uuid);
    if (!user) {
      throw new NotFoundException(`El usuario con id ${uuid} no fue encotrado`);
    }
    return user;
  }


  createUser(user: UsersDto): User {
    const newUserId = Math.random().toString(36).slice(-2);
    const newUser: User = { ...user, uuid: newUserId };
    this.users.push(newUser);
    return newUser;
  }
  
 
  deleteUser(uuid: string): boolean {
    const userIndex = this.users.findIndex(user => user.uuid === uuid);
    if (userIndex < 0) {
      return false;
    }
    this.users.splice(userIndex, 1);
    return true;
  }
  
  updateUser(uuid: string, user: UsersDto): User {
    const existingUser = this.getUser(uuid);
    const updatedUser = {
      ...existingUser,
      ...user,
      id: existingUser.uuid
    };
    this.users.splice(this.users.indexOf(existingUser), 1, updatedUser);
    return updatedUser;
  }
  
  patchUser(uuid: string, fieldsToUpdate: Partial<UsersPatchDto>): User {
    const existingUser = this.users.find(user => user.uuid === uuid);
    if (existingUser) {
      const updatedUser = { ...existingUser, ...fieldsToUpdate };
      this.users = this.users.map(user => (user.uuid === uuid ? updatedUser : user));
      return updatedUser;
    }
    throw new NotFoundException(`Usuario no encontrado ${uuid}`);
  }
  
}



