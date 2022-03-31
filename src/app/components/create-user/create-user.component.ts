import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'exads-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public newUser: User;
  public newUserForm: FormGroup = new FormGroup({
    firstName: new FormControl('firstName'),
    lastName: new FormControl('lastName'),
    userName: new FormControl('userName'),
    email: new FormControl('email')
}); ;

  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  public cancel(): void {
    // navigate back
  }

  public addNewUser(): void {
    this.userService.postUser(this.newUser).toPromise().then((success)=>{
      // display toast
    },
    (error)=>{
      // display toast
    });
  }
}
