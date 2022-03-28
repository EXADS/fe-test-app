import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { ROUTES } from './enums/routes.enum';


const routes: Routes = [
  {
    path: ROUTES.USERS,
    component: UsersTableComponent,
  },
  {
    path: ROUTES.CREATE_USER,
    component: CreateUserComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: ROUTES.USERS, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
