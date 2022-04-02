import { UserService } from './../../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSnackBarModule, MatInputModule, MatButtonModule, MatProgressBarModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateUserComponent } from './create-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

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
      declarations: [ CreateUserComponent ],
      providers: [UserService]
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
});
