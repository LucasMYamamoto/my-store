export interface User {
  id: string;
  name:string;
  email: string;
  password: string;
}

//Data Transfer Object
export interface CreateUserDTO extends Omit<User, 'id'>{}
