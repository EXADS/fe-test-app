import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'exads-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public isLoading: boolean = false;
  constructor(public loadingService: LoadingService) {
  }
  ngAfterViewInit(): void {
    // short timeout to prevent ExpressionChanged errors
    setTimeout(() => {
      this.subscriptions.push(
        this.loadingService.loading().subscribe((loading) => {
          debugger;
          this.isLoading = loading;
        })
      );
    }, 100)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
