import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { MatPaginatorModule, MatTableModule } from '@angular/material';

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
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
