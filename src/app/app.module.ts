import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatPaginatorIntl, MatPaginatorModule, MatProgressBarModule, MatSelectModule, MatSnackBarModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { CustomMatPagerIntl } from './mat-helpers/custom-mat-pager-intl';


@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: CustomMatPagerIntl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
