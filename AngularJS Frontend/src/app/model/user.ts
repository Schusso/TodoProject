export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  passwordHash: string;
  todoItems: [{
    id: number;
    name: string;
    isComplete: boolean;
  }];
}
