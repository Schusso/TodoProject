import {User} from './user';

export class Todo {
  id: number;
  name: string;
  isComplete: boolean;
  textBox: string;
  user: User;
  expiryDate: string;
}
