import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Language } from "src/app/models/language";
import { User } from "src/app/models/user";
import { LanguageService } from "src/app/services/language.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "exads-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.scss"],
})
export class CreateUserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  isDarkTheme: boolean = JSON.parse(localStorage.getItem("darkMode"));

  translations: Language[] = [];

  createUser = new FormGroup({
    username: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.noSpecialchars.bind(this),
        this.customValidatorRepeat.bind(this),
      ])
    ),
    first_name: new FormControl("", Validators.required),
    last_name: new FormControl(""),
    email: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.email])
    ),
  });

  ngOnInit() {
    this.getLanguage();
  }

  getLanguage() {
    this.languageService.getLanguage().subscribe((data) => {
      this.translations = JSON.parse(data);
    });
  }

  onSubmit(createUser: FormGroup) {
    if (createUser.status == "VALID") {
      var user: User = {
        id: null,
        first_name: createUser.value.first_name,
        last_name: createUser.value.last_name,
        username: createUser.value.username,
        created_date: null,
        id_status: 1,
        email: createUser.value.email,
      };
      this.userService
        .createUser(user)
        .subscribe((data) => this.router.navigate(["/users"]));
    }
  }

  customValidatorRepeat(control: FormControl): void {
    if (control.valid && control.value.length > 3) {
      this.userService.checkUser(control.value).subscribe((data) => {
        if (data["data"]["count"] > 0) {
          control.setErrors({ myRepeatError: true });
        }
      });
    }
  }

  noSpecialchars(control: FormControl): void {
    var notAllowed = /[ '{}"\[\].!]/;
    if (control.valid) {
      if (notAllowed.test(control.value) == true) {
        setTimeout(() => {
          control.setErrors({ mySpecialError: true });
        });
      }
    }
  }
}
