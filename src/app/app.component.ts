import { LoadingService } from './services/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'exads-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public loadingService: LoadingService) {
  }
}
