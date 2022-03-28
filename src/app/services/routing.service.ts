import { ROUTES } from '../enums/routes.enum';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  public navigateToCreateUser(): void {
      this.router.navigateByUrl(ROUTES.USERS);
  }

}
