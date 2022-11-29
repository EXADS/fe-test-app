import { RoutingService } from './../../services/routing.service';
import { CreateUserComponent } from './../create-user/create-user.component';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule, MatPaginatorModule, MatSnackBar, MatSnackBarModule, MatTableModule, PageEvent } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncScheduler, of, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersResponse } from 'src/app/responses/users.response';
import { UserRequest } from './../../requests/user.request';
import { UserService } from './../../services/user.service';
import { UsersTableComponent } from './users-table.component';
import { fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';


describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;
  let app: UsersTableComponent;
  let mockUserService: jasmine.SpyObj<UserService> = jasmine.createSpyObj('UserService', ['getUsers', 'postUser', 'getByUsername'])
  let mockUserData: User[] = [];
  let mockUserDataByUsername: UsersResponse;
  const mockSnackbarMock = jasmine.createSpyObj(['open']);
  const mockRoutingService = jasmine.createSpyObj(['navigateToCreateUser']);

  beforeEach(() => {
    mockUserService.getUsers.and.callFake(function () {
      return of(mockUserData, asyncScheduler)
    });
    mockUserService.postUser.and.callFake(function (newUser: UserRequest) {
      return of(undefined)
    });
    mockUserService.getByUsername.and.callFake(function (userName: string) {
      return of(mockUserDataByUsername, asyncScheduler)
    });
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatInputModule, MatPaginatorModule, MatTableModule, MatButtonModule],
      declarations: [UsersTableComponent],
      providers: [{ provide: UserService, useValue: mockUserService }, { provide: MatSnackBar, useValue: mockSnackbarMock },
      { provide: RoutingService, useValue: mockRoutingService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should assign a paginator', () => {
    app.ngOnInit();
    app.ngAfterViewInit();
    expect(app.dataSource.paginator).toEqual(app.paginator);
  });

  it('it should retrieve users', async () => {
    mockUserData = [
      new User(),
      new User(),
      new User()
    ];
    mockUserData.forEach((user: User) => {
      user.first_name = 'DUMMY_first_name'
      user.last_name = 'DUMMY_last_name'
      user.username = 'DUMMY_username'
      user.email = 'DUMMY_email'
      user.id = 123
      user.id_status = 'DUMMY_id_status'
      user.created_date = new Date(Date.now());
    })
    app.ngOnInit();
    expect(mockUserService.getUsers).toHaveBeenCalled();
    await mockUserService.getUsers().toPromise().then(() => {
      expect(app.dataSource.data).toEqual(mockUserData);
    })
  });

  it('it should set isMobile', () => {
    app.ngOnInit();
    app.ngAfterViewInit();
    expect(app.isMobile).toEqual(window.innerWidth <= 600);
  });

  it('it should show error on getUsers failure', async () => {
    mockUserService.getUsers.and.callFake(function () {
      return throwError(new Error('error'), asyncScheduler);
    });
    app.ngOnInit();
    expect(mockUserService.getUsers).toHaveBeenCalled();
    await mockUserService.getUsers().subscribe(() => { }, () => {
      expect(app.dataSource.data).toEqual([]);
      expect(mockSnackbarMock.open).toHaveBeenCalledWith('error', '', { duration: 10000, panelClass: 'error' });
    })
  });

  it('it should navigate to create user page', async () => {
    const navigateButton = fixture.debugElement.query(By.css('#btn-nav-create-user'));
    spyOn(app, 'navigateToCreateUser').and.callThrough();
    navigateButton.triggerEventHandler('click', null);
    expect(app.navigateToCreateUser).toHaveBeenCalled();
    expect(mockRoutingService.navigateToCreateUser).toHaveBeenCalled();
  });


  it('it should adjust paginator position on page event', fakeAsync(() => {
    spyOn(app, 'handlePageEvent').and.callThrough();
    var calculateFunction = spyOn<any>(app, 'calculateNewBottom').and.callThrough();
    const pageEvent = new PageEvent();
    pageEvent.pageSize = 10;
    app.paginator.page.emit(pageEvent);
    expect(app.handlePageEvent).toHaveBeenCalled();
    tick(100);
    expect(calculateFunction).toHaveBeenCalled();
    const rangeActions = fixture.debugElement.query(By.css('.mat-paginator-range-actions'))
    expect(rangeActions.nativeElement.style.bottom).toEqual((window.innerHeight - (app.userTableContainer.nativeElement.offsetHeight + 64 + 40)) + 'px');
  }));

});
