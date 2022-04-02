import { IUser } from 'src/app/interfaces/user.interface';
export class User implements IUser {
  public id: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public username: string;
  public created_date: Date;
  public id_status: string;
}
