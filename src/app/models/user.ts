export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash:any;
  passwordSalt:any;
  status:boolean;
}
