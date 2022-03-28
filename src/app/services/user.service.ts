import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { API_ROUTES } from './../enums/api-routes.enum';
import { UsersResponse } from './../responses/users.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<UsersResponse>(environment.apiBaseUrl + '/' + API_ROUTES.USERS)
    .pipe(map((response: UsersResponse) => {debugger; return response.data.users}));
  }
}
