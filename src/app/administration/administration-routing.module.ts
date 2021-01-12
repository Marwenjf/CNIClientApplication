import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '', component: UsersComponent, canActivate:[AuthGuardService] },
  {
    path: 'admin/users',
    component: UsersComponent,
    children: [
      {
        path: '/add', component: AddUserComponent
      },
      {
        path: '/edit/:mat', component: EditUserComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
