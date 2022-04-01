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
    this.userService.postUser(this.newUser).toPromise().then((success) => {
      // display toast
    },
      (error) => {
        // display toast
      });
  }

  public invalidData(): boolean {
    return true;
  }

  public checkForError(controlName: string, errorName: string): boolean {
    return this.newUserForm.controls[controlName].hasError(errorName);
  }

  public getErrors(controlName: string): void {
    console.log("errors for: ", controlName);
    console.log(this.newUserForm.controls[controlName].errors);
  }
}
