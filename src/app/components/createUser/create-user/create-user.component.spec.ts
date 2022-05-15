import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { CreateUserComponent } from "./create-user.component";

describe("CreateUserComponent", () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      providers: [],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        HttpClientModule,
        RouterTestingModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  //Did not cover all tests as it was not required but added some none the less
  it("should test the form group element count", (done) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const formElement =
        fixture.debugElement.nativeElement.querySelector("#create_user");
      const inputElements = formElement.querySelectorAll("input");
      expect(inputElements.length).toBe(4);
      done();
    });
  });

  it("should test default form values", () => {
    const loginFormGroup = component.createUser;
    const loginFormValues = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
    };
    expect(loginFormGroup.value).toEqual(loginFormValues);
  });

  it("should test username value before entering some value and validation", (done) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const loginFormUserElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[0];

      const usernameValueFormGroup = component.createUser.get("username");

      expect(loginFormUserElement.value).toEqual(usernameValueFormGroup.value);
      expect(usernameValueFormGroup.errors).not.toBeNull();
      expect(usernameValueFormGroup.errors.required).toBeTruthy();

      done();
    });
  });

  it("should test username value after entering some value and validation", (done) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const loginFormUserElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[0];

      loginFormUserElement.value = "username";
      loginFormUserElement.dispatchEvent(new Event("input"));

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const usernameValueFormGroup = component.createUser.get("username");

        expect(loginFormUserElement.value).toEqual(
          usernameValueFormGroup.value
        );
        expect(usernameValueFormGroup.errors).toBeNull();
        done();
      });
    });
  });

  it("should test login form when validations are fulfilled", (done) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const loginFormUserElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[0];
      const loginFormFirstElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[1];
      const loginFormLastElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[2];
      const loginFormEmailElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[3];

      loginFormUserElement.value = "GaryK123";
      loginFormFirstElement.value = "Gary";
      loginFormLastElement.value = "Kelly";
      loginFormEmailElement.value = "gary@gmail.com";

      loginFormUserElement.dispatchEvent(new Event("input"));
      loginFormFirstElement.dispatchEvent(new Event("input"));
      loginFormLastElement.dispatchEvent(new Event("input"));
      loginFormEmailElement.dispatchEvent(new Event("input"));

      const isCreateUserValid = component.createUser.valid;

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(isCreateUserValid).toBeTruthy();

        done();
      });
    });
  });
  it("should test login form when email is not valid", (done) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const loginFormUserElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[0];
      const loginFormFirstElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[1];
      const loginFormLastElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[2];
      const loginFormEmailElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[3];

      loginFormUserElement.value = "GaryK123";
      loginFormFirstElement.value = "Gary";
      loginFormLastElement.value = "Kelly";
      loginFormEmailElement.value = "garyil.com";

      loginFormUserElement.dispatchEvent(new Event("input"));
      loginFormFirstElement.dispatchEvent(new Event("input"));
      loginFormLastElement.dispatchEvent(new Event("input"));
      loginFormEmailElement.dispatchEvent(new Event("input"));

      const isCreateUserValid = component.createUser.valid;

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(isCreateUserValid).not.toBeTruthy();

        done();
      });
    });
  });

  it("should test login form when username last name is not present", (done) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const loginFormUserElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[0];
      const loginFormFirstElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[1];
      const loginFormEmailElement: HTMLInputElement =
        fixture.debugElement.nativeElement
          .querySelector("#create_user")
          .querySelectorAll("input")[3];

      loginFormUserElement.value = "GaryK123";
      loginFormFirstElement.value = "Gary";
      loginFormEmailElement.value = "gary@gmail.com";

      loginFormUserElement.dispatchEvent(new Event("input"));
      loginFormFirstElement.dispatchEvent(new Event("input"));
      loginFormEmailElement.dispatchEvent(new Event("input"));

      const isCreateUserValid = component.createUser.valid;

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(isCreateUserValid).toBeTruthy();

        done();
      });
    });
  });
});
