import { APP_ROUTES } from '../enums/app-routes.enum';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  public navigateToCreateUser(): void {
      this.router.navigateByUrl(APP_ROUTES.CREATE_USER);
  }

}
