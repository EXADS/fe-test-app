import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { APP_ROUTES } from './enums/app-routes.enum';


const routes: Routes = [
  {
    path: APP_ROUTES.USERS,
    component: UsersTableComponent,
  },
  {
    path: APP_ROUTES.CREATE_USER,
    component: CreateUserComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: APP_ROUTES.USERS, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
