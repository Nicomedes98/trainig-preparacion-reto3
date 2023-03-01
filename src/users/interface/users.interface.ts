import { v4 as uuid } from 'uuid';
export interface User {
  uuid: string;
  name: string;
  lastName?: string;
  email: string;

}