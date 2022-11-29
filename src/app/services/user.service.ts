import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { _errorHandler } from "src/app/util/reponse-utils";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  private url: string = "http://localhost:3000";

  getAllUsers() {
    return this.httpClient
      .get(this.url + "/users")
      .pipe(catchError(_errorHandler));
  }

  getUserById(id: number) {
    return this.httpClient
      .get(this.url + "/users/" + id)
      .pipe(catchError(_errorHandler));
  }

  getPage(pageNum: number, limit: number) {
    return this.httpClient
      .get(this.url + "/users?page=" + pageNum + "&limit=" + limit)
      .pipe(catchError(_errorHandler));
  }

  checkUser(username: string) {
    return this.httpClient.get(this.url + "/users?username=" + username);
  }
  createUser(user: User) {
    return this.httpClient
      .post(this.url + "/users", {
        user,
      })
      .pipe(catchError(_errorHandler));
  }
}
