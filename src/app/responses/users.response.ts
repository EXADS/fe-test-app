import { User } from '../models/user.model';
import { ApiResponse } from './../interfaces/api-response.interface';
export class UsersResponse implements ApiResponse<User> {
  data: { count?: number;
  users: User[] };
}
