import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userNameValidator } from 'src/app/validators/user-name-validator';
import { UserRequest } from './../../requests/user.request';
import { UsersResponse } from './../../responses/users.response';
import { RoutingService } from './../../services/routing.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'exads-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  public newUser: UserRequest = new UserRequest();
  public newUserForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', []),
    userName: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3), userNameValidator()]),
    email: new FormControl('', [Validators.required, Validators.email,])
  });;

  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private userService: UserService, private routingService: RoutingService) { }

  public cancel(): void {
    this.routingService.navigateToUsersTable();
  }

  public addNewUser(): void {
    this.userService.getByUsername(this.newUserForm.get("userName").value).toPromise().then((result: UsersResponse) => {
      debugger;
      if (result && result.data && result.data.count > 0) {
        // abort, with user exists warning
      } else {
        this.assignDataToNewUser();
        this.postUser();
      }
    }).catch((err) => {
      // show error toast
    });
  }
  public assignDataToNewUser(): void {
    this.newUser.first_name = this.newUserForm.get("firstName").value;
    this.newUser.last_name = this.newUserForm.get("lastName").value;
    this.newUser.username = this.newUserForm.get("userName").value;
    this.newUser.email = this.newUserForm.get("email").value;
    this.newUser.id_status = 1;
  }

  private postUser() {
    this.userService.postUser(this.newUser).toPromise().then((success) => {
      // display toast
    },
      (error) => {
        // display toast
      });
  }

  public checkForError(controlName: string, errorName: string): boolean {
    return this.newUserForm.controls[controlName].hasError(errorName);
  }
}
