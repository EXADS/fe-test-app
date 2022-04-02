import { User } from '../models/user.model';
import { ApiResponse } from './../interfaces/api-response.interface';
export class UsersResponse implements ApiResponse<User> {

  constructor(){
    this.data = {
      count: 0,
      users: []
    }
  }
  public data: {
    count: number;
    users: User[];
  };
}
