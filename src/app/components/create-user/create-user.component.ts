import { UsersResponse } from './../../responses/users.response';
import { Observable } from 'rxjs';
import { RoutingService } from './../../services/routing.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from './../../services/user.service';
import { userNameValidator } from 'src/app/validators/user-name-validator';

@Component({
  selector: 'exads-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public newUser: User;
  public newUserForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', []),
    userName: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(3), userNameValidator()]),
    email: new FormControl('', [Validators.required, Validators.email,])
  });;

  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private userService: UserService, private routingService: RoutingService) { }

  ngOnInit() {
    console.log(this.newUserForm)
  }

  public cancel(): void {
    this.routingService.navigateToUsersTable();
  }

  public addNewUser(): void {
    const userForPost = {
      firstName: this.newUserForm.get("firstName").value,
      lastName: this.newUserForm.get("lastName").value,
      userName: this.newUserForm.get("userName").value,
      email: this.newUserForm.get("email").value
    }
    this.userService.getByUsername(userForPost.userName).toPromise().then((result: UsersResponse) => {
      if (result && result.data && result.data.count > 0) {
        // abort, with user exists warning
      } else {
        this.postUser(userForPost);
      }
    }).catch((err) => {
      // show error toast
    });
  }

  private postUser(userForPost: { firstName: any; lastName: any; userName: any; email: any; }) {
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
