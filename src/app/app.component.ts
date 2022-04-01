import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'exads-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public loadingService: LoadingService) {
  }
}
