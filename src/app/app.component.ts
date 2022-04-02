import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'exads-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public isLoading: boolean = false;
  constructor(public loadingService: LoadingService) {
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.loadingService.loading().subscribe((loading) => {
        // use short timeout to prevent ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.isLoading = loading;
        }, 100)
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
