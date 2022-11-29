import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { Status } from "../models/status";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  constructor(private httpClient: HttpClient) {}

  private url: string = "http://localhost:3000";

  getAllStatuses() {
    return this.httpClient.get(this.url + "/statuses");
  }
}
