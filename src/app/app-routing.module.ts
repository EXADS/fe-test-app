import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./components/users/users.component";
import { CreateUserComponent } from "./components/createUser/create-user/create-user.component";
import { NavComponent } from "./components/nav/nav/nav.component";

const routes: Routes = [
  { path: "", redirectTo: "/users", pathMatch: "full" },
  {
    path: "users",
    component: NavComponent,
    children: [
      { path: "", component: UsersComponent, pathMatch: "full" },
      { path: "create", component: CreateUserComponent, pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },

  // Default Path
  { path: "**", redirectTo: "/users", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
