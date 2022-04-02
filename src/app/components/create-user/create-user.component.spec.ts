import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSnackBar, MatSnackBarModule, MatTableModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncScheduler, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserRequest } from 'src/app/requests/user.request';
import { UsersResponse } from 'src/app/responses/users.response';
import { RoutingService } from 'src/app/services/routing.service';
import { ApiResponse } from './../../interfaces/api-response.interface';
import { UserService } from './../../services/user.service';
import { CreateUserComponent } from './create-user.component';


describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  let mockUserService: jasmine.SpyObj<UserService> = jasmine.createSpyObj('UserService', ['getUsers', 'postUser', 'getByUsername'])
  let mockUserData: User[] = [];
  let mockUserDataByUsername: UsersResponse;
  const mockSnackbarMock = jasmine.createSpyObj(['open']);
  const mockRoutingService = jasmine.createSpyObj(['navigateToCreateUser']);
  const mockNewUser = new UserRequest();
  const userCreatedResponse: ApiResponse<User> = {
    data: new User
  };

  beforeEach(() => {
    mockUserService.getUsers.and.callFake(function () {
      return of(mockUserData, asyncScheduler)
    });
    mockUserService.postUser.and.callFake(function (newUser: UserRequest) {
      return of(userCreatedResponse)
    });
    mockUserService.getByUsername.and.callFake(function (userName: string) {
      return of(mockUserDataByUsername, asyncScheduler)
    });
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [CreateUserComponent],
      providers: [{ provide: UserService, useValue: mockUserService }, { provide: MatSnackBar, useValue: mockSnackbarMock },
      { provide: RoutingService, useValue: mockRoutingService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('it should add new user, display success toast', (fakeAsync(() => {
    const addUserButton = fixture.debugElement.query(By.css('#btn-add-user'));
    spyOn(component, 'addNewUser').and.callThrough();
    spyOn(component, 'assignDataToNewUser').and.callFake(() => {
      mockNewUser.first_name = 'DUMMY_first_name';
      mockNewUser.last_name = 'DUMMY_last_name';
      mockNewUser.username = 'DUMMY_username';
      mockNewUser.email = 'DUMMY_email';
      mockNewUser.id_status = 1;
      component.newUser = mockNewUser;
    });
    mockUserDataByUsername = new UsersResponse();
    mockUserService.getByUsername.and.returnValue(of(mockUserDataByUsername, asyncScheduler));
    addUserButton.triggerEventHandler('click', null);
    expect(component.addNewUser).toHaveBeenCalled();
    tick(100);
    expect(mockUserService.getByUsername).toHaveBeenCalled();
    expect(component.assignDataToNewUser).toHaveBeenCalled();
    expect(mockUserService.postUser).toHaveBeenCalledWith(component.newUser);
    expect(component.newUser).toEqual(mockNewUser);
    expect(mockSnackbarMock.open).toHaveBeenCalledWith("TOAST.SUCCESS.USER_CREATED", '', { duration: 10000, panelClass: 'success' });
  }
  )));

  it('if user present, it should NOT add new user, display error toas', (fakeAsync(() => {
    const addUserButton = fixture.debugElement.query(By.css('#btn-add-user'));
    spyOn(component, 'addNewUser').and.callThrough();
    spyOn(component, 'assignDataToNewUser');
    mockUserDataByUsername = new UsersResponse();
    mockUserDataByUsername.data.count = 1;
    mockUserService.getByUsername.and.returnValue(of(mockUserDataByUsername, asyncScheduler));
    addUserButton.triggerEventHandler('click', null);
    expect(component.addNewUser).toHaveBeenCalled();
    tick(100);
    expect(mockUserService.getByUsername).toHaveBeenCalled();
    expect(component.assignDataToNewUser).not.toHaveBeenCalled();
    expect(component.newUser).toEqual(new UserRequest());
    expect(mockSnackbarMock.open).toHaveBeenCalledWith("TOAST.ERROR.USERNAME_TAKEN", '', { duration: 10000, panelClass: 'warn' });
  }
  )));

  it('it should assign data from form fields to user object', (fakeAsync(() => {
    const userToSet = new UserRequest();
    userToSet.first_name = 'DUMMY_firstName';
    userToSet.last_name = 'DUMMY_lastName';
    userToSet.username = 'DUMMY_userName';
    userToSet.email = 'DUMMY_email@email.com';
    userToSet.id_status = 1;

    component.newUserForm.setValue({
      firstName: userToSet.first_name,
      lastName: userToSet.last_name,
      userName: userToSet.username,
      email: userToSet.email,
    });
    spyOn(component, 'addNewUser').and.callThrough();
    spyOn(component, 'assignDataToNewUser').and.callThrough();
    mockUserDataByUsername = new UsersResponse();
    mockUserService.getByUsername.and.returnValue(of(mockUserDataByUsername, asyncScheduler));
    const addUserButton = fixture.debugElement.query(By.css('#btn-add-user'));
    addUserButton.triggerEventHandler('click', null);
    expect(component.addNewUser).toHaveBeenCalled();
    tick(100);
    expect(mockUserService.getByUsername).toHaveBeenCalled();
    expect(component.assignDataToNewUser).toHaveBeenCalled();
    expect(component.newUser).toEqual(userToSet);
  }
  )));

});
