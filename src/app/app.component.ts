import { Component } from '@angular/core';
import { RoutingService } from './services/routing.service';

@Component({
  selector: 'exads-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private routingService: RoutingService){
      this.routingService.navigateToUsersTable();
  }
}
