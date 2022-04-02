import { UserRequest } from './../requests/user.request';
import { HttpClient, HttpParams } from '@angular/common/http';
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
      .pipe(map((response: UsersResponse) => { return response.data.users }));
  }

  public postUser(newUser: UserRequest): Observable<any> {
    return this.http.post<User>(environment.apiBaseUrl + '/' + API_ROUTES.USERS, {user: newUser});
  }

  public getByUsername(username: string): Observable<UsersResponse> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username", username);
    return this.http.get<UsersResponse>(environment.apiBaseUrl + '/' + API_ROUTES.USERS,{params:queryParams})
  }
}

