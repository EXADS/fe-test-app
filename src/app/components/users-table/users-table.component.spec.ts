import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { MatInputModule, MatPaginatorModule, MatSnackBar, MatSnackBarModule, MatTableModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable, throwError, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersResponse } from 'src/app/responses/users.response';
import { UserRequest } from './../../requests/user.request';
import { UserService } from './../../services/user.service';
import { UsersTableComponent } from './users-table.component';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';


describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;
  let app: UsersTableComponent;
  let mockUserService: jasmine.SpyObj<UserService> = jasmine.createSpyObj('UserService', ['getUsers', 'postUser', 'getByUsername'])
  let mockUserData: User[] = [];
  let mockUserDataByUsername: UsersResponse;

  const dummyMatSnackBar = {
    open(message: string, action: string, options: { duration: number, panelClass: string }) {
    }
  }

  beforeEach(() => {
    mockUserService.getUsers.and.callFake(function () {
      return of(mockUserData)
    });
    mockUserService.postUser.and.callFake(function (newUser: UserRequest) {
      //
      return of(undefined)
    });
    mockUserService.getByUsername.and.callFake(function (userName: string) {
      return of(mockUserDataByUsername)
    });
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatInputModule, MatPaginatorModule, MatTableModule, MatButtonModule],
      declarations: [UsersTableComponent],
      providers: [{ provide: UserService, useValue: mockUserService }]
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
      expect(app.subSucceeded).toEqual(true);
    })
  });

  it('it should set isMobile', () => {
    app.ngOnInit();
    app.ngAfterViewInit();
    expect(app.isMobile).toEqual(window.innerWidth <= 600);
  });

  // it('it should show error on getUsers failure', async () => {
  //   mockUserService.getUsers.and.callFake(function () {
  //     return throwError({status: 500});
  //   });
  //   app.ngOnInit();
  //   expect(mockUserService.getUsers).toHaveBeenCalled();
  //   await mockUserService.getUsers().subscribe(()=>{}, ()=>{
  //     expect(app.dataSource.data).toEqual([]);
  //     expect(app.subFailed).toEqual(true);
  //   })
  // });

});
