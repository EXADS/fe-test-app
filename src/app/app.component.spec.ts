import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatProgressBarModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { LoadingService } from './services/loading.service';

describe('AppComponent', () => {

  let _loading = new BehaviorSubject(false);
  beforeEach(async(() => {
    const mockLoadingService = jasmine.createSpyObj('LoadingService', ['isLoading', 'setLoading', 'loading']);

    mockLoadingService.isLoading.and.callFake(function(){
      return _loading;
    });
    mockLoadingService.setLoading.and.callFake(function(loading:boolean){
      _loading.next(loading);
    });
    mockLoadingService.loading.and.callFake(function(){
      return _loading.asObservable();
    });

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatProgressBarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: LoadingService, useValue: mockLoadingService }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should subscribe to loading events', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();

    expect(app.subscriptions).toBeTruthy();
    expect(app.subscriptions.length).toBeGreaterThan(0);
    expect(app.subscriptions[0].closed).toBeFalsy();
  });

  it('it should update loading value', (fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(LoadingService);
    app.ngOnInit();

    expect(app.isLoading).toBe(false);
    service.setLoading(true);
    tick(150);
    expect(app.isLoading).toBe(true);
  })));

  it('it should unsubscribe on destroy', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();

    expect(app.subscriptions).toBeTruthy();
    app.ngOnDestroy();
    expect(app.subscriptions[0].closed).toBeTruthy();
  });
});
